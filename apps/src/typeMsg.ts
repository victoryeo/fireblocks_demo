import {
  FireblocksSDK,
  PeerType,
  TransactionOperation,
  TransactionStatus,
  TransactionResponse
} from "fireblocks-sdk";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

console.log(process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH)
const privateKey = fs.readFileSync(
  path.resolve(process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH ?? ''), "utf8");
const apiKey = process.env.FIREBLOCKS_API_KEY ?? '';

// Choose the right api url for your workspace type 
const baseUrl = "https://sandbox-api.fireblocks.io";
const fireblocks = new FireblocksSDK(privateKey, apiKey, baseUrl);

async function signEIP712Message(
  vaultAccountId: string,
  exampleSignRequest: any
) {
  const { status, id } = await fireblocks.createTransaction({
    operation: TransactionOperation.TYPED_MESSAGE,
    assetId: "ETH",
    source: {
      type: PeerType.VAULT_ACCOUNT,
      id: vaultAccountId
    },
    amount: "0",
    note: "Test EIP-712 Message",
    extraParameters: {
      rawMessageData: {
        messages: [exampleSignRequest],
      },
    },
  });
  let currentStatus = status;
  let txInfo;

  while (currentStatus != TransactionStatus.COMPLETED 
    && currentStatus != TransactionStatus.FAILED) {
    console.log("keep polling for tx " + id + "; status: " + currentStatus);
    txInfo = await fireblocks.getTransactionById(id);
    currentStatus = txInfo.status;
    await new Promise(r => setTimeout(r, 1000));
  };
  return currentStatus;
}

const exampleSignRequest = {
  type: "EIP712",
  index: 0,
  content: {
    types: {
      EIP712Domain: [
        {
          name: "name",
          type: "string"
        },
        {
          name: "version",
          type: "string"
        },
        {
          name: "chainId",
          type: "uint256"
        },
        {
          name: "verifyingContract",
          type: "address"
        }
      ],
      Permit: [
        {
          name: "owner",
          type: "address"
        },
        {
          name: "spender",
          type: "address"
        },
        {
          name: "value",
          type: "uint256"
        },
        {
          name: "nonce",
          type: "uint256"
        },
        {
          name: "deadline",
          type: "uint256"
        }
      ]
    },
    primaryType: "Permit",
    domain: {
      name: "USDC",
      version: "1",
      chainId: 9,
      verifyingContract: "0x6e11530D05DF9BcA475Ba23eA26AcCCab9122d4c"
    },
    message: {
      owner: "0x74ehEb032057CF42bDA226F132AF771ADc415D32",
      spender: "0x7a6E1C5cBe4F7B1f863b2251Cb801b4dEE905c2c",
      value: 2,
      nonce: 0,
      deadline: 1923318233
    }
  }
};

signEIP712Message(
  "0", exampleSignRequest)
  .then(data => {
    console.log('status', data)
  })
  .catch(error => {
    console.log('error', error)
  })