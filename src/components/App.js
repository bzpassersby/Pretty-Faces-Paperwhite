import { useState, useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Countdown from "react-countdown";
import Web3 from "web3";

// Import Images + CSS
import twitter from "../images/socials/twitter.svg";
import instagram from "../images/socials/instagram.svg";
import opensea from "../images/socials/opensea.svg";
import showcase from "../images/showcase.png";
import "../App.css";

// Import Components
import Navbar from "./Navbar";

// Import ABI + Config
import PrettyFaces from "../abis/PrettyFaces.json";
import config from "../config.json";

function App() {
  const [web3, setWeb3] = useState(null);
  const [prettyFaces, setPrettyFaces] = useState(null);

  const [supplyAvailable, setSupplyAvailable] = useState(0);

  const [account, setAccount] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [ownerOf, setOwnerOf] = useState([]);
  const [ownerTokenCount, setOwnerTokenCount] = useState(0);

  const [explorerURL, setExplorerURL] = useState("https://etherscan.io");
  const [openseaURL, setOpenseaURL] = useState("https://opensea.io");
  const [openseaURLAsset, setOpenseaURLAsset] = useState(
    "https://opensea.io/assets"
  );

  const [isMinting, setIsMinting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState(null);

  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const [revealTime, setRevealTime] = useState(0);

  const [isCycling, setIsCycling] = useState(false);
  const [nftName, setNftName] = useState(null);
  const [counter, setCounter] = useState(7);

  const [cost, setCost] = useState(0);
  const [maxMintAmount, setMaxMintAmount] = useState(1);

  const nftNames = config.names;

  const loadBlockchainData = async (_web3, _account, _networkId) => {
    // Fetch Contract, Data, etc.
    try {
      const prettyFaces = new _web3.eth.Contract(
        PrettyFaces.abi,
        PrettyFaces.networks[_networkId].address
      );
      setPrettyFaces(prettyFaces);

      const maxSupply = await prettyFaces.methods.maxSupply().call();
      const totalSupply = await prettyFaces.methods.totalSupply().call();
      setSupplyAvailable(maxSupply - totalSupply);

      const allowMintingAfter = await prettyFaces.methods
        .allowMintingAfter()
        .call();
      const timeDeployed = await prettyFaces.methods.timeDeployed().call();
      setRevealTime(
        (Number(timeDeployed) + Number(allowMintingAfter)).toString() + "000"
      );

      if (_account) {
        const ownerOf = await prettyFaces.methods
          .walletOfOwner(_account)
          .call();
        setOwnerOf(ownerOf);
      } else {
        setOwnerOf([]);
      }
    } catch (error) {
      setIsError(true);
      setMessage(
        "Contract not deployed to current network, please change network in MetaMask"
      );
    }
  };

  const loadWeb3 = async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);

      const accounts = await web3.eth.getAccounts();

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setMessage("Please connect with MetaMask");
      }

      const networkId = await web3.eth.net.getId();
      setNetworkId(networkId);

      if (networkId !== 5777) {
        setExplorerURL(config.NETWORKS[networkId].explorerURL);
        setOpenseaURL(config.NETWORKS[networkId].openseaURL);
        setOpenseaURLAsset(config.NETWORKS[networkId].openseaURLAsset);
      }

      await loadBlockchainData(web3, accounts[0], networkId);

      window.ethereum.on("accountsChanged", function (accounts) {
        setAccount(accounts[0]);
        setMessage(null);
      });

      window.ethereum.on("chainChanged", (newchainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        setNetworkId(newchainId);
        console.log(newchainId);
        // window.location.reload();
      });
    }
  };

  // MetaMask Login/Connect
  const web3Handler = async () => {
    if (web3) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    }
  };

  const mintNFTHandler = async () => {
    if (revealTime > new Date().getTime()) {
      window.alert("Minting is not live yet!");
      return;
    }

    if (ownerOf.length >= maxMintAmount) {
      window.alert(
        "You've exceeded the max. mint amount! Check our Opensea Collection to see available trades:)"
      );
      return;
    }
    try {
      // Mint NFT
      if (prettyFaces && account) {
        setIsMinting(true);
        setIsError(false);

        await prettyFaces.methods
          .mint(1)
          .send({ from: account, value: cost })
          .on("confirmation", async () => {
            const maxSupply = await prettyFaces.methods.maxSupply().call();
            const totalSupply = await prettyFaces.methods.totalSupply().call();
            setSupplyAvailable(maxSupply - totalSupply);

            const ownerOf = await prettyFaces.methods
              .walletOfOwner(account)
              .call();
            setOwnerOf(ownerOf);
            const ownerTokenCount = await prettyFaces.methods
              .balanceOf(account)
              .call();
            setOwnerTokenCount(ownerTokenCount);
            console.log(ownerTokenCount);
          })
          .on("error", (error) => {
            window.alert(error);
            setIsError(true);
          });
      }

      setIsMinting(false);
    } catch (error) {
      setIsError(true);
      window.alert("Transaction may have been canceled by user...");
      window.location.reload(false);
    }
  };

  const cycleImages = async () => {
    const getRandomNumber = () => {
      const counter = Math.floor(Math.random() * 500) + 1;
      setCounter(counter);
      let name = nftNames[counter - 1].split(" ");
      let wordFirst = name[0];
      let wordSecond = name[1];
      let newname = `${counter}_${wordFirst}%20${wordSecond}`;
      setNftName(newname);
    };

    if (!isCycling) {
      setInterval(getRandomNumber, 3000);
    }
    setIsCycling(true);
  };

  const getCost = async () => {
    const cost = await prettyFaces.methods.cost().call();
    setCost(cost);
  };

  const getMaxMintAmount = async () => {
    const maxMintAmount = await prettyFaces.methods.maxMintAmount().call();
    setMaxMintAmount(maxMintAmount);
  };

  useEffect(() => {
    loadWeb3();
    cycleImages();
  }, [account, networkId]);

  useEffect(() => {
    getCost();
    getMaxMintAmount();
  });

  return (
    <div>
      <Navbar
        web3Handler={web3Handler}
        account={account}
        explorerURL={explorerURL}
      />
      <main>
        <section id="welcome" className="welcome">
          <Row className="header my-3 p-3 mb-0 pb-0">
            <Col xs={12} md={12} lg={8} xxl={8}>
              <h1>Pretty Faces</h1>

              <p className="sub-header">Availble on 01 / 23 / 23</p>
            </Col>
            <Col className="flex social-icons">
              <a
                href="https://twitter.com/bzpassersby"
                target="_blank"
                className="circle flex button"
              >
                <img src={twitter} alt="Twitter" />
              </a>
              <a href="#" target="_blank" className="circle flex button">
                <img src={instagram} alt="Instagram" />
              </a>
              <a
                href={`${openseaURL}/collection/pretty-faces-paperwhite`}
                target="_blank"
                className="circle flex button"
              >
                <img src={opensea} alt="Opensea" />
              </a>
            </Col>
          </Row>

          <Row className="flex m-3">
            <Col md={5} lg={4} xl={5} xxl={4} className="text-center">
              <img
                src={`https://bafybeiaopnu243kotugcnwrq27vnazwal3665v2fhn6gue63o3nx65lysi.ipfs.nftstorage.link/${nftName}.png`}
                alt="Pretty Faces"
                className="showcase"
              />
            </Col>
            <Col md={5} lg={4} xl={5} xxl={4}>
              {revealTime !== 0 && (
                <Countdown
                  date={currentTime + (revealTime - currentTime)}
                  className="countdown mx-3"
                />
              )}
              <p className="text">
                Everyone has a pretty face. Yes, everyone! This project is set
                to celebrate what makes us unique and the diversity in the
                aesthetics of beauty. Our facial features don't define us, and
                do not need to fit in a stereotype. Neither does our race, or
                gender, or age, or whatever.
              </p>
              <a href="#about" className="button mx-3">
                Learn More!
              </a>
            </Col>
          </Row>
        </section>
        <section id="about" className="about">
          <Row className="flex m-3">
            <h2 className="text-center p-3">About the Collection</h2>
            <Col md={5} lg={4} xl={5} xxl={4} className="text-center">
              <img
                src={showcase}
                alt="Multiple Pretty Faces"
                className="showcase"
              />
            </Col>
            <Col md={5} lg={4} xl={5} xxl={4}>
              {isError ? (
                <p>{message}</p>
              ) : (
                <div>
                  <h3>Mint your NFT in</h3>
                  {revealTime !== 0 && (
                    <Countdown
                      date={currentTime + (revealTime - currentTime)}
                      className="countdown"
                    />
                  )}
                  <ul>
                    <li>Paperwhite Drop : 500 pretty faces</li>
                    <li>Each pretty face has their own name.</li>
                    <li>Mint your first pretty face on Polygon network</li>
                    <li>Viewable on Opensea shortly after minting</li>
                    <li>Share and tell us the name of your pretty face!</li>
                  </ul>

                  {isMinting ? (
                    <Spinner animation="border" className="p-3 m-2" />
                  ) : (
                    <button
                      onClick={mintNFTHandler}
                      className="button mint-button mt-3"
                    >
                      Mint
                    </button>
                  )}

                  {ownerOf.length > 0 && (
                    <p>
                      <small>
                        View your NFT on
                        <a
                          href={`${openseaURLAsset}/${prettyFaces._address}/${
                            ownerOf[ownerTokenCount - 1]
                          }`}
                          target="_blank"
                          style={{ display: "inline-block", marginLeft: "3px" }}
                        >
                          OpenSea
                        </a>
                      </small>
                    </p>
                  )}
                </div>
              )}
            </Col>
          </Row>

          <Row style={{ marginTop: "100px" }}>
            <Col>
              {prettyFaces && (
                <a
                  href={`${explorerURL}/address/${prettyFaces._address}`}
                  target="_blank"
                  className="text-center"
                >
                  {prettyFaces._address}
                </a>
              )}
            </Col>
          </Row>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
