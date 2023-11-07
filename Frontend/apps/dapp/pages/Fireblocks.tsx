import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Spinner,
  Center,
  extendTheme,
  ChakraProvider,
  Text
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FireblocksSDK }  from "fireblocks-sdk";

const linkFireblocksSandbox =
  "https://developers.fireblocks.com/docs/sandbox-quickstart";

const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          maxWidth: ["50%", "50%", "50%"],
          minWidth: "45%",
          bg: "#ffffff"
        }
      })
    },
    Button: {

    }
  }
});

function Fireblocks({keyData}) {
  const [vaultId, setVaultId] = useState("0");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchVault = async () => {
      console.log(process.env.NX_FIREBLOCKS_API_KEY)
      console.log(process.env.NX_WALLET_CONNECT_ID)
      
      const privateKey = process.env.NX_FIREBLOCKS_API_PRIVATE_KEY_PATH
      console.log(privateKey)

      console.log(keyData.keyData)
      const apiKey = process.env.NX_FIREBLOCKS_API_KEY;
      // Choose the right api url for your workspace type 
      const baseUrl = "https://sandbox-api.fireblocks.io";
/*      const fireblocks = new FireblocksSDK(keyData.keyData, apiKey, baseUrl);

      let vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});
      console.log(vaultAccounts)
      console.log("vault connected")
      setVaultId(vaultAccounts.accounts[0]);*/
    }

    fetchVault().catch(console.error);
  }, []);

  const onCreateVault = async () => {
    console.log("create vault")
    const srcRpc = "http://localhost:9090/api/createVault";
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
    };
    let receipt = await fetch(`${srcRpc}`, requestOptions);
    let jsonData = await receipt.json();
    console.log(`txn receipt`, jsonData);
    setVaultId(jsonData.id);
  }

  const onMintNft = async () => {
    console.log("mint Nft")
  }

  return (
    <div>
      <ChakraProvider theme={theme}>
        <Center>
          <Button border="2px" colorScheme="purple" onClick={onOpen} margin={4}>
            Access Vault 
          </Button>
        </Center>
        <Center>
          <p />
          <Text fontSize='lg'>Vault Id is {vaultId}</Text>
          
        </Center>

        {vaultId && (
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color="white">
                Click this {" "}
                <a
                  href={linkFireblocksSandbox}
                  target="_blank"
                  rel="noreferrer"
                >
                  Fireblocks Sandbox link
                </a>{" "}
                to learn more
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody textAlign={"center"} fontSize={"12px"}>
                <Button border="2px" colorScheme="blue" onClick={onCreateVault} margin={4}>
                  Create Vault Account
                </Button>
                <Center>
                  <div>
                    <p />
                    <Text fontSize='lg'>Vault Id is {vaultId}</Text>
                  </div>
                </Center>

              </ModalBody>

              <Center>
                <ModalFooter>
                  <Button border="2px" colorScheme="blue" onClick={onMintNft} margin={4}>
                    Mint NFT
                  </Button>

                </ModalFooter>
              </Center>
            </ModalContent>
          </Modal>
        )}
    
      </ChakraProvider>
    </div>
  );
}

export default Fireblocks;
