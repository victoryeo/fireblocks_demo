import {
  FireblocksSDK,
  PeerType,
} from "fireblocks-sdk";
import * as dotenv from "dotenv";

dotenv.config();

async function createTransaction(
  assetId: string, amount: string, srcId:any, destId: any) {
  const fireblocks = new FireblocksSDK(
    process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH ?? '',
    process.env.FIREBLOCKS_API_KEY ?? '',
    "https://sandbox-api.fireblocks.io",
  );

  let payload = {
    assetId,
    amount,
    source: {
      type: PeerType.VAULT_ACCOUNT,
      id: String(srcId)
    },
    destination: {
      type: PeerType.VAULT_ACCOUNT,
      id: String(destId)
    },
    note: "Your first transaction!"
  };
  const result = await fireblocks.createTransaction(payload);
  console.log(JSON.stringify(result, null, 2));
}

createTransaction("ETH", "0.001", "8", "0");
