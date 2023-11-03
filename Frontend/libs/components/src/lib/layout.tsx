import { Router, useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { AppModal } from './modal';
import { Link } from '@mui/material';
import { createPublicClient, http, Client, PublicClient } from "viem";
import { polygonMumbai } from "viem/chains";
import {
  getAccount,
  readContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";
import {
  //Box,
  Container,
  Flex,
  Heading,
  Button,
  Spinner,
  Card,
  Center,
  VStack,
  ChakraProvider,
  extendTheme,
  defineStyleConfig
} from "@chakra-ui/react";
import { CustomConnectButton } from "./CustomeConnectButton";
import WalletButton from './walletButton';
import { Options } from '@da-tokenization/components';

const Button1 = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: 'base', // <-- border radius is same for all variants and sizes
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'purple.500',
      color: 'purple.500',
    },
    solid: {
      bg: 'purple.500',
      color: 'white',
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
})

const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          maxWidth: ["50%", "50%", "50%"],
          minWidth: "45%",
          bg: "#ffffff"
        },
      })
    },
    Button1,
  }
});

type AppLayoutProps = {
  children?: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const router = useRouter();
  const [isLogin, setLogin] = useState<boolean>(false);
  const [ipfsCid, setIpfsCid] = useState<string>('');
  const [ipfsPath, setIpfsPath] = useState<string>('');
  const [publicClient, setPublicClient] = useState<PublicClient>();
  const [connectedAddress, setConnectedAddress] = useState<string>();
  const [addressIsConnected, setAddressIsConnected] = useState(false);
  const [showConnectionInfo, setShowConnectionInfo] = useState(false);
  const [currentBlockNumber, setCurrentBlockNumber] = useState<bigint>();

  const admin = localStorage.getItem('user') == 'admin' ? true : false;
  const user =
    localStorage.getItem('user') != `${localStorage.getItem('user')}`
      ? true
      : false;


  useEffect(() => {
    // A Public Client is an interface to "public" JSON-RPC API methods
    // for sending transactions, reading from smart contracts
    const newPublicClient: PublicClient = createPublicClient({
      chain: polygonMumbai,
      transport: http(),
    });
    setPublicClient(newPublicClient);

    // interval check whether user has connected or disconnected wallet
    const interval = setInterval(() => {
      const { address, isConnected } = getAccount();
      setConnectedAddress(address);
      setAddressIsConnected(isConnected);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (publicClient) {
      const checkCurrentBlockNumber = async () => {
        const blockNumber = await publicClient.getBlockNumber();
        setCurrentBlockNumber(blockNumber);
      };

      //checkCurrentBlockNumber();
    }
  }, [publicClient]);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setLogin(true);
    }
    {
      setIpfsPath('/preview.png');
    }
    console.log(ipfsPath);
  }, [admin, user]);

  const handleLogin = async () => {
    if (!isLogin) {
      router.push('/');
    } else {
      setLogin(false);
      localStorage.clear();
      router.push('/');
    }
  };

  return (
    <div>
      {!router.asPath.endsWith('/') && !router.asPath.endsWith('/signup') ? (
        <div className="sideba_content">
          <Box sx={{ height: '50%' }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link href="/listAsset">
                    <div className="logo-wrap">
                      <div className="logo-img">
                        
                      </div>
                    </div>
                  </Link>
                  <span className="textmiddle">
                    DID Demo
                  </span>
                </Typography>

                &nbsp;
                <Box>
                  {showConnectionInfo && (
                  <Box>
                    <WalletButton />
                  </Box>
                  )}
                </Box>
                &nbsp;
                <Box>
                <Container maxW={"100%"} py={4}>
                  <Button onClick={() => setShowConnectionInfo(!showConnectionInfo)}>
                    {showConnectionInfo ? "Hide" : "Show"} wallet button
                  </Button>
                </Container>
                </Box>
                &nbsp;
                {isLogin ? (
                  <Button onClick={() => handleLogin()} color="inherit">
                    Logout
                  </Button>
                ) : (
                  ''
                )}
              </Toolbar>
            </AppBar>
            <Link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"></Link>
            <div className="outer-wrap">
              <div className="row">
                <div className="col-md-2">
                  <Options />
                </div>
                <div className="col-md-10">
                  {children}
                  <div className="footer">
                    Copyright ©️2023 SettleMint. All Rights Reserved.
                  </div>
                </div>
              </div>
            </div>
          </Box>
          <AppModal />
        </div>
      ) : (
        <div>{children}</div>
      )}
    
    </div>
  );
};
