import {
  FireblocksSDK,
} from "fireblocks-sdk";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { inspect } from "util";

dotenv.config();

console.log(process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH)
const privateKey = fs.readFileSync(
  path.resolve(process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH ?? ''), "utf8");
const apiKey = process.env.FIREBLOCKS_API_KEY ?? '';

// Choose the right api url for your workspace type 
const baseUrl = "https://sandbox-api.fireblocks.io";
const fireblocks = new FireblocksSDK(privateKey, apiKey, baseUrl);

(async () => {

  // Print vaults before creation
  let vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});
  console.log(inspect(vaultAccounts, false, null, true));
  let length = vaultAccounts.accounts.length;
  console.log(vaultAccounts.accounts[length-1])
  // Create vault account
  console.log("QuickStart_Vault1");
  /*const vaultCreation = await fireblocks.createVaultAccount("QuickStart_Vault");
  console.log(inspect(vaultCreation, false, null, true));
  console.log("QuickStart_Vault2");
  
  // Print vaults after creation
  vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});
  console.log(inspect(vaultAccounts, false, null, true));

  let assetId = "ETH_TEST3";
  let vaultWallet = await fireblocks.createVaultAsset(vaultCreation.id, assetId);
  const result = [{ "Vault Name": vaultCreation.name, "Vault ID": vaultCreation.id, "Asset ID": assetId, "Wallet Address": vaultWallet.address }];
  console.log(JSON.stringify(result, null, 2));*/

})().catch((e) => {
  console.error(`Failed: ${e}`);
})
