import hre from "hardhat";

async function main() {
  // on local testnet
  const collectionAddress = "0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab";

  const signer: any[] = await hre.ethers.getSigners()
  const signerAddress = await signer[0].getAddress()
  console.log("signerAddress", signerAddress)
  const nftContract = await hre.ethers.getContractAt("SpaceBunnies", collectionAddress);

  const tx = await nftContract.safeMint(signerAddress);
  const resu = await tx.wait()
  //console.log(resu)
  const nftInx = Number(resu.events[0].args[2])
  console.log("A new NFT index ", nftInx, "has been minted" );
  console.log("tokenURI:", await nftContract.tokenURI(nftInx))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
