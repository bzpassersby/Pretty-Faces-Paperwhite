const PrettyFaces = artifacts.require("PrettyFaces");
require("dotenv").config();

module.exports = async function (deployer) {
  const IPFS_IMAGE_METADATA_URI = `ipfs://${process.env.IPFS_IMAGE_METADATA_CID}/`;
  const IPFS_HIDDEN_IMAGE_METADATA_URI = `ipfs://${process.env.IPFS_HIDDEN_IMAGE_METADATA_CID}/hidden.json`;
  const NFT_MINT_DATE = new Date(process.env.NFT_MINT_DATE)
    .getTime()
    .toString()
    .slice(0, 10);
  const royalityFee = 8;

  await deployer.deploy(
    PrettyFaces,
    process.env.PROJECT_NAME,
    process.env.PROJECT_SYMBOL,
    process.env.MINT_COST,
    process.env.MAX_SUPPLY,
    NFT_MINT_DATE,
    IPFS_IMAGE_METADATA_URI,
    IPFS_HIDDEN_IMAGE_METADATA_URI,
    process.env.ARTIST_ADDRESS,
    royalityFee
  );
};
