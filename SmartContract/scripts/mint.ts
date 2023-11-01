import hre from "hardhat";

async function main() {
  const collectionAddress = "0x234855669984493948A9898765";
  const signer: any[] = await hre.ethers.getSigners()
  const signerAddress = await signer[0].getAddress()
  console.log(signerAddress)
  const nftContract = await hre.ethers.getContractAt("T_NAME", collectionAddress, signerAddress);
  const tokenData = {
    "name": "NFT_NAME",
    "image": "IMAGE_URL",
  }
  const tx = await nftContract.safeMint(signerAddress);
  await tx.wait()
  
  console.log("A new NFT has been minted to:", signerAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
