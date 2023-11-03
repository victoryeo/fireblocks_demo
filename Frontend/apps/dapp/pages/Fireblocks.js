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
  ChakraProvider
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  FireblocksSDK,
} from "fireblocks-sdk";

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
  const [vaultId, setVaultId] = useState("");

  useEffect(() => {
    const fetchVault = async () => {
      console.log(process.env.NX_FIREBLOCKS_API_KEY)
      console.log(process.env.NX_WALLET_CONNECT_ID)
      
      const privateKey = process.env.NX_FIREBLOCKS_API_PRIVATE_KEY_PATH
      console.log(privateKey)

      console.log(keyData.keyData)
      /*const apiKey = process.env.NX_FIREBLOCKS_API_KEY;
      // Choose the right api url for your workspace type 
      const baseUrl = "https://sandbox-api.fireblocks.io";
      const fireblocks = new FireblocksSDK(privateKey, apiKey, baseUrl);

      let vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});
      console.log(vaultAccounts)
      console.log("vault connected")
      setVaultId(vaultAccounts.accounts[0]);*/
    }

    fetchVault().catch(console.error);
  }, []);

  return (
    <div>
      <ChakraProvider theme={theme}>
        {vaultId ? (
          <Button border="2px" colorScheme="purple" onClick={onOpen} margin={4}>
            Create Vault Account
          </Button>
        ) : (
          <Center>
            vault Id is {vaultId}
          </Center>
        )}
      </ChakraProvider>
    </div>
  );
}

export default Fireblocks;
