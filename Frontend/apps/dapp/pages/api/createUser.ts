import { ethers } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const wallet = ethers.Wallet.createRandom();

  const response ={
    walletID: wallet.address,
    walletKey: wallet.privateKey
  }

  await response;
  try {
    res.json(response);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
  console.log(response)
};
