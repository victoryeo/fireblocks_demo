import { useState } from "react";
import { ConnectWalletClient, ConnectPublicClient } from "./viemClient";
import styles from './components.module.css'

export default function WalletButton() {
  //State variables for address & balance
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<BigInt>(BigInt(0));
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Function requests connection and retrieves the address of wallet
  // Then it retrievies the balance of the address 
  // Finally it updates the value for address & balance variable
  async function handleConnect() {
    try {
        // Instantiate a Wallet & Public Client
        const walletClient = ConnectWalletClient();
        const publicClient = ConnectPublicClient();
    
        // Performs Wallet Action to retrieve wallet address
        const [address] = await walletClient.getAddresses();
        
        // Performs Public Action to retrieve address balance
        const balance = await publicClient.getBalance({ address });
        // Update values for address & balance state variable
        setAddress(address);
        setBalance(balance);
        setIsConnected(true)
    } catch (error) {
        // Error handling
        alert(`Transaction failed: ${error}`);
    }
  }

  async function handleDisconnect() {
    setAddress('');
    setBalance(0);
    setIsConnected(false)
  }

  // Unimportant Section Below / Nice to Have UI
  return (
    <>
      <Status address={address} balance={balance} />
      {!isConnected ? 
      <button className={styles.connectbuttonStyle}
        onClick={handleConnect}
      >
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask Fox" style={{ width: "25px", height: "25px" }} />

        <h3 className="mx-auto">Connect Wallet</h3>
      </button>
      :
      <button className={styles.disconnectbuttonStyle}
        onClick={handleDisconnect}
      ><h3 className="mx-auto">Disconnect Wallet</h3>
      </button>
      }
    </>
  );
}
            
// Displays the wallet address once it’s successfuly connected
// You do not have to read it, it's just frontend stuff

function Status({
  address,
  balance,}: {
  address: string | null;
  balance: BigInt;
}) {
    if (!address) {
      return (
        <div className="flex items-center">
          <div className="bg-red-600 border-red-600 rounded-full w-1.5 h-1.5 mr-2">
          </div>
          <div>Disconnected</div>
        </div>);
    }
    return (
      <div className="flex items-center w-full">
        <div className="bg-green-500 border-green-500 rounded-full w-1.5 h-1.5 mr-2"></div>
        <div className="text-xs md:text-xs">{address} <br /> Balance: {balance.toString()}</div>
      </div>
    );
}