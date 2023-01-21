const PrettyFaces = artifacts.require("./PrettyFaces");

require("chai").use(require("chai-as-promised")).should();

const EVM_REVERT = "VM Exception while processing transaction: revert";

contract("PrettyFaces", ([deployer, user, user2]) => {
  const NAME = "Pretty Faces - Paperwhite";
  const SYMBOL = "PFP";
  const COST = 1000000000000000;
  const MAX_SUPPLY = 500;
  const royalityFee = 8;

  // NOTE: If images are already uploaded to IPFS, you may choose to update the links, otherwise you can leave it be.
  const IPFS_IMAGE_METADATA_URI =
    "ipfs://bafybeidvgv6jznxitixtn6ynlo56n4jhb2l7mgxnb2wsh572ujed6izvvm/";
  const IPFS_HIDDEN_IMAGE_METADATA_URI =
    "ipfs://IPFS-HIDDEN-METADATA-CID/hidden.json";

  let prettyFaces;

  describe("Deployment", () => {
    let milliseconds = 120000; // Number between 100000 - 999999
    let result, timeDeployed;

    beforeEach(async () => {
      const NFT_MINT_DATE = (Date.now() + milliseconds).toString().slice(0, 10);

      prettyFaces = await PrettyFaces.new(
        NAME,
        SYMBOL,
        COST,
        MAX_SUPPLY,
        NFT_MINT_DATE,
        IPFS_IMAGE_METADATA_URI,
        IPFS_HIDDEN_IMAGE_METADATA_URI,
        deployer,
        royalityFee
      );

      timeDeployed =
        NFT_MINT_DATE - Number(milliseconds.toString().slice(0, 3));
    });

    it("Returns the contract name", async () => {
      result = await prettyFaces.name();
      result.should.equal(NAME);
    });

    it("Returns the symbol", async () => {
      result = await prettyFaces.symbol();
      result.should.equal(SYMBOL);
    });

    it("Returns the cost to mint", async () => {
      result = await prettyFaces.cost();
      result.toString().should.equal(COST.toString());
    });

    it("Returns the max supply", async () => {
      result = await prettyFaces.maxSupply();
      result.toString().should.equal(MAX_SUPPLY.toString());
    });

    it("Returns the max mint amount", async () => {
      result = await prettyFaces.maxMintAmount();
      result.toString().should.equal("2");
    });

    it("Returns the time deployed", async () => {
      result = await prettyFaces.timeDeployed();

      if (result > 0) {
        assert.isTrue(true);
      } else {
        console.log(result);
        assert.isTrue(false);
      }
    });

    it("Returns the amount of seconds from deployment to wait until minting", async () => {
      let buffer = 2;
      let target = Number(milliseconds.toString().slice(0, 3));
      result = await prettyFaces.allowMintingAfter();
      result = Number(result);

      // NOTE: Sometimes the seconds may be off by 1, As long as the seconds are
      // between the buffer zone, we'll pass the test
      if (result > target - buffer && result <= target) {
        assert.isTrue(true);
      } else {
        assert.isTrue(false);
      }
    });

    it("Returns how many seconds left until minting allowed", async () => {
      let buffer = 2;
      let target = Number(milliseconds.toString().slice(0, 3));
      result = await prettyFaces.getSecondsUntilMinting();
      result = Number(result);
      console.log(result);

      // NOTE: Sometimes the seconds may be off by 1, As long as the seconds are
      // between the buffer zone, we'll pass the test
      if (result > target - buffer && result <= target + buffer) {
        assert.isTrue(true);
      } else {
        assert.isTrue(false);
      }
    });

    it("Returns current pause state", async () => {
      result = await prettyFaces.isPaused();
      result.toString().should.equal("false");
    });

    it("Returns current reveal state", async () => {
      result = await prettyFaces.isRevealed();
      result.toString().should.equal("true");
    });
  });

  describe("Minting", async () => {
    describe("Success", async () => {
      let result;

      beforeEach(async () => {
        const NFT_MINT_DATE = Date.now().toString().slice(0, 10);

        prettyFaces = await PrettyFaces.new(
          NAME,
          SYMBOL,
          COST,
          MAX_SUPPLY,
          NFT_MINT_DATE,
          IPFS_IMAGE_METADATA_URI,
          IPFS_HIDDEN_IMAGE_METADATA_URI,
          deployer,
          royalityFee
        );

        result = await prettyFaces.mint(1, {
          from: user,
          value: web3.utils.toWei("0.1", "ether"),
        });
      });

      it("Returns the address of the minter", async () => {
        let event = result.logs[0].args;
        event.to.should.equal(user);
      });

      it("Updates the total supply", async () => {
        result = await prettyFaces.totalSupply();
        result.toString().should.equal("1");
      });

      it("Returns IPFS URI", async () => {
        result = await prettyFaces.tokenURI(1);
        result.should.equal(`${IPFS_IMAGE_METADATA_URI}1.json`);
      });

      it("Returns how many a minter owns", async () => {
        result = await prettyFaces.balanceOf(user);
        result.toString().should.equal("1");
      });

      it("Returns the IDs of minted NFTs", async () => {
        result = await prettyFaces.walletOfOwner(user);
        result.length.should.equal(1);
        result[0].toString().should.equal("1");
      });
    });

    describe("Failure", async () => {
      let result;

      beforeEach(async () => {
        // Some date in the future
        const NFT_MINT_DATE = new Date("May 26, 2030 18:00:00")
          .getTime()
          .toString()
          .slice(0, 10);

        prettyFaces = await PrettyFaces.new(
          NAME,
          SYMBOL,
          COST,
          MAX_SUPPLY,
          NFT_MINT_DATE,
          IPFS_IMAGE_METADATA_URI,
          IPFS_HIDDEN_IMAGE_METADATA_URI,
          deployer,
          royalityFee
        );
      });

      it("Attempt to mint before mint date", async () => {
        await prettyFaces
          .mint(1, { from: user, value: web3.utils.toWei("0.1", "ether") })
          .should.be.rejectedWith(EVM_REVERT);
      });
    });
  });

  describe("Updating Contract State", async () => {
    describe("Success", async () => {
      let result;

      beforeEach(async () => {
        const NFT_MINT_DATE = Date.now().toString().slice(0, 10);

        prettyFaces = await PrettyFaces.new(
          NAME,
          SYMBOL,
          COST,
          MAX_SUPPLY,
          NFT_MINT_DATE,
          IPFS_IMAGE_METADATA_URI,
          IPFS_HIDDEN_IMAGE_METADATA_URI,
          deployer,
          royalityFee
        );
      });

      it("Sets the cost", async () => {
        let cost = web3.utils.toWei("1", "ether");
        await prettyFaces.setCost(cost, { from: deployer });
        result = await prettyFaces.cost();
        result.toString().should.equal(cost);
      });

      it("Sets the pause state", async () => {
        let isPaused = true; // Opposite of the default contract state
        await prettyFaces.setIsPaused(isPaused, { from: deployer });
        result = await prettyFaces.isPaused();
        result.toString().should.equal(isPaused.toString());
      });

      it("Sets the reveal state", async () => {
        let isRevealed = false; // Opposite of the default contract state
        await prettyFaces.setIsRevealed(isRevealed, { from: deployer });
        result = await prettyFaces.isRevealed();
        result.toString().should.equal(isRevealed.toString());
      });

      it("Sets the max batch mint amount", async () => {
        let amount = 5; // Different from the default contract state
        await prettyFaces.setmaxMintAmount(5, { from: deployer });
        result = await prettyFaces.maxMintAmount();
        result.toString().should.equal(amount.toString());
      });

      it("Sets the IPFS not revealed URI", async () => {
        let uri = "ipfs://IPFS-NEW-IMAGE-METADATA-CID/"; // Different from the default contract state
        await prettyFaces.setNotRevealedURI(uri, { from: deployer });
        result = await prettyFaces.notRevealedUri();
        result.toString().should.equal(uri);
      });

      it("Sets the base extension", async () => {
        let extension = ".example"; // Different from the default contract state
        await prettyFaces.setBaseExtension(".example", { from: deployer });
        result = await prettyFaces.baseExtension();
        result.toString().should.equal(extension);
      });
    });
  });

  describe("GiftMinting", async () => {
    describe("Success", async () => {
      let result;
      beforeEach(async () => {
        const NFT_MINT_DATE = Date.now().toString().slice(0, 10);

        prettyFaces = await PrettyFaces.new(
          NAME,
          SYMBOL,
          COST,
          MAX_SUPPLY,
          NFT_MINT_DATE,
          IPFS_IMAGE_METADATA_URI,
          IPFS_HIDDEN_IMAGE_METADATA_URI,
          deployer,
          royalityFee
        );
        console.log(user2);
        result = await prettyFaces.giftMint(1, user2);
      });

      it("Updates the total supply", async () => {
        result = await prettyFaces.totalSupply();
        result.toString().should.equal("1");
      });

      it("correctly updated count of giftMint", async () => {
        result = await prettyFaces.giftMintCount();

        result.toString().should.equal("1");
      });
    });
  });
});
