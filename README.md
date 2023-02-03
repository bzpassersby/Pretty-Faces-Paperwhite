<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/bzpassersby/bowzer-exchange">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Pretty Faces Paperwhite</h3>

  <p align="center">
The project creates and deploys an ERC721 NFT collection contract, as well as link a front end web app to allow collectors to view NFT colleciton information, view countdown timer to NFT drops, as well as minting NFTs.
    <br />
    <a href="https://orange-frost-9284.on.fleek.co/" target="_blank">View Demo</a>
    ·
    <a href="https://github.com/bzpassersby/Pretty-Faces-Paperwhite/issues">Report Bug</a>
    ·
    <a href="https://github.com/bzpassersby/Pretty-Faces-Paperwhite/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#deployment-guide">Deployment</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>

  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://orange-frost-9284.on.fleek.co/)

## Built With

- Solidity
- Javascript
- React Js
- [Web3](https://web3js.readthedocs.io/en/v1.5.2/)
- [Truffle](https://www.trufflesuite.com/docs/truffle/overview)
- [Ganache](https://www.trufflesuite.com/ganache)
- [Infura.io](https://infura.io/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Below is a list of prerequisite:

- Install [NodeJS](https://nodejs.org/en/), Recommended version is 14.16.0
- Install [MetaMask](https://metamask.io/) in your browser.

## Installation

### 1. Clone/Download the Repository

### 2. Install Dependencies:

`$ npm install `

### 3. Setup .env File

Create a .env file or rename the .env.example file, and update the values. The API & IPFS keys are technically optional for local testing, if you plan to deploy to the testnet or mainnet, you'll need to update those values.

### 4. Start Ganache

`$ npx ganache -p 7545 `

### 5. Test Smart Contract

`$ npx truffle test`

### 6. Migrate(Deployment) Smart Contracts

- Prepare for Contract Deployment.(Read below detailed contract deployment guide)

- After preparation, in a separate terminal run:
  `$ npx truffle migrate --reset`
  And specify network information with `--network`

### 7. Run Frontend Application

In another separate terminal run:
`$ npm start`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Deployment Guide

- Create or log in to your [Infura.io](https://infura.io/login) account and create a new project, and save your project ID located in your project settings, you'll need this if deploying to Ethereum Mainnet, or Goerli Testnet.

- If deploying to Polygon, you may need to setup the network in MetaMask. To do this, open MetaMask, in the top right click on your profile icon -> Settings -> Networks -> Add Network.

  - For **Polygon Mainnet** fill in the following:
    1. **Network Name**: Polygon
    2. **New RPC URL**: https://rpc-mainnet.maticvigil.com/
    3. **Chain ID**: 137
    4. **Currency Symbol**: MATIC
    5. **Block Explorer URL**: https://polygonscan.com/
  - For the **Polygon Mumbai Testnet** fill in the following:
    1. **Network Name**: Polygon Mumbai
    2. **New RPC URL**: https://rpc-mumbai.maticvigil.com/
    3. **Chain ID**: 80001
    4. **Currency Symbol**: MATIC
    5. **Block Explorer URL**: https://mumbai.polygonscan.com/

- Create a .env file in the root directory of your project, and fill in the following:

```sh
DEPLOYER_PRIVATE_KEY="YOUR_PRIVATE_KEY"
INFURA_API_KEY="PROJECT_ID"
ETHERSCAN_API_KEY="API_TOKEN"

PROJECT_NAME="YOUR_PROJECT_NAME"
PROJECT_SYMBOL="YOUR_PROJECT_SYMBOL"
MINT_COST=0
MAX_SUPPLY=1000

IPFS_IMAGE_METADATA_CID="IPFS_CID"
IPFS_HIDDEN_IMAGE_METADATA_CID="IPFS_CID"
NFT_MINT_DATE="Oct 27, 2021 20:00:00"
```

<!-- USAGE EXAMPLES -->

## Usage

To interact with the web app, first connect an ethereum account with metamask wallet.

After initial NFT drop countdown laps (depending on `NFT_MINT_DATE=''` setting in `.env` file), click the `mint` button to mint an NFT token. And after transaction confirmation, a link would appear that takes user to "Opensea.io" to view minted NFT.

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

bzpassersby - [@bzpassersby](https://twitter.com/bzpassersby) - bowenzby@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[vue-url]: https://vuejs.org/
[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://angular.io/
[svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[svelte-url]: https://svelte.dev/
[laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[laravel-url]: https://laravel.com
[bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com
[jquery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[jquery-url]: https://jquery.com
