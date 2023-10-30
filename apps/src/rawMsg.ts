import { createHash } from "crypto";
import { FireblocksSDK, 
  PeerType, 
  TransactionOperation, 
  TransactionStatus,
  TransactionResponse } from "fireblocks-sdk";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

async function signArbitraryMessage(
  fireblocks: FireblocksSDK, 
  vaultAccountId: string, 
  message: string, 
  bip44addressIndex = 0
) {
  const wrappedMessage = "\x18Bitcoin Signed Message:\n" + String.fromCharCode(message.length) + message;

  const hash = createHash('sha256').update(wrappedMessage, 'utf8').digest();

  const content = createHash('sha256').update(hash).digest("hex");

  const { status, id } = await fireblocks.createTransaction({
    operation: TransactionOperation.RAW,
    assetId: "BTC",
    source: {
      type: PeerType.VAULT_ACCOUNT,
      id: vaultAccountId
    },
    note: `BTC Message: ${message}`,
    extraParameters: {
      rawMessageData: {
        messages: [{
          content,
          bip44addressIndex
        }]
      }
    }
  });

  let txInfo: TransactionResponse;
  let currentStatus = status;

  while (currentStatus != TransactionStatus.COMPLETED 
    && currentStatus != TransactionStatus.FAILED
  ) {
    try {
      console.log("keep polling for tx " + id + "; status: " + currentStatus);
      txInfo  = await fireblocks.getTransactionById(id);
      currentStatus = txInfo.status;
      console.log("txInfo", txInfo);
      let signature = txInfo.signedMessages ? txInfo.signedMessages[0]?.signature : { fullSig: "", v: 0, r: "", s: ""};
      if (signature == undefined) (
        signature = { fullSig: "", v: 0, r: "", s: "" }
      )
      console.log("signature", JSON.stringify(signature));
      const encodedSig = Buffer.from(
        [Number.parseInt(signature.v?.toString() ?? '', 16) + 31]).toString("hex") + signature.fullSig;
      console.log("Encoded Signature:", Buffer.from(encodedSig, "hex").toString("base64"));
    
    } catch (err) {
      console.log("err", err);
    }
    await new Promise(r => setTimeout(r, 1000));
  };
  return currentStatus
}

dotenv.config();

console.log(process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH)
const privateKey = fs.readFileSync(
  path.resolve(process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH ?? ''), "utf8");
const apiKey = process.env.FIREBLOCKS_API_KEY ?? '';

// Choose the right api url for your workspace type 
const baseUrl = "https://sandbox-api.fireblocks.io";
const fireblocks = new FireblocksSDK(privateKey, apiKey, baseUrl);

signArbitraryMessage(
  fireblocks, "0", "MY TEXT HERE")
.then(data => {
  console.log('status', data)
})
.catch(error => {
  console.log('error', error)
})