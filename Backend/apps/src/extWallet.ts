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
  const name: string = "Counter-Party Wallet #4";
  const externalWallet = await fireblocks.createExternalWallet(name);
  console.log(JSON.stringify(externalWallet, null, 2));

  const walletContainerId = externalWallet.id;
  const assetId = "USDC";
  const address = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
  //const tag = "0x12345678";
  const externalWalletAsset = await fireblocks.createExternalWalletAsset(walletContainerId, assetId, address);
  console.log(JSON.stringify(externalWalletAsset, null, 2));

})().catch((e) => {
  console.error(`Failed: ${e}`);
})
