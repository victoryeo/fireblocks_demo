import {
  FireblocksSDK,
} from "fireblocks-sdk";
import fs from "fs";
import path from "path";
import { inspect } from "util";

import * as dotenv from "dotenv";

dotenv.config();

console.log(process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH)
const privateKey = fs.readFileSync(
  path.resolve(process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH ?? ''), "utf8");
const apiKey = process.env.FIREBLOCKS_API_KEY ?? '';

// Choose the right api url for your workspace type 
const baseUrl = "https://sandbox-api.fireblocks.io";
const fireblocks = new FireblocksSDK(privateKey, apiKey, baseUrl);

async function listNft()
{
  // Get vaults
  const vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});

  console.log("vaultAccounts")
  console.log(inspect(vaultAccounts, false, null, true));

  // Extract vault account ids
  const vaultAccountsIds = vaultAccounts.accounts.map((va: any) => va.id);
  console.log("vaultAccountsIds")
  console.log(inspect(vaultAccountsIds, false, null, true));

  // Refresh tokens metadata per vault
  for (const vaId of vaultAccountsIds) {
    try {
      await fireblocks.refreshNFTOwnershipByVault(
         vaId,
        "ETH_TEST3",
      );
    } catch (e) {
      console.log(`Could not refresh vault vtId=${vaId}`);
    }
  }

  // Fetch all owned tokens in tenant with their corresponding balance
  const ownedNFTs = await fireblocks.getOwnedNFTs({
    vaultAccountIds: vaultAccountsIds,
    blockchainDescriptor: "POLYGON_TEST_MUMBAI",
  });

  console.log("ownedNFTs")
  console.log(inspect(ownedNFTs, false, null, true));

  // Extract NFT ids
  const nftIds: string[] = ownedNFTs.data?.map((nft: { id: string; }) => nft.id) ?? [];

  // Refresh metadata for every ids
  for (const nftId of nftIds) {
    try {
      await fireblocks.refreshNFTMetadata(nftId);
    } catch (error) {
      console.log(`Could not refresh NFT metadata for ${nftId}`);
    }
  }

  return nftIds;
}

listNft()
  .then(data => {
    console.log('status', data)
  })
  .catch(error => {
    console.log('error', error)
  })