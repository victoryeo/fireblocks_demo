import App, { AppContext, AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useApollo } from '../hooks/use-apollo';
import { Toaster } from 'react-hot-toast';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppLayout } from '@da-tokenization/components';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import router from 'next/router';
import { ModalProvider } from '@da-tokenization/providers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { polygonMumbai } from "wagmi/chains";
import { getDefaultWallets, RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My Polygon ID VC Gated dapp",
  projectId: process.env.NX_WALLET_CONNECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const { client } = useApollo(pageProps);
  const getLayout = Component.getLayout || ((page) => page);

  if (!client) {
    return null;
  }

  return (
    <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains} theme={midnightTheme()}>
    <ApolloProvider client={client}>
      <ModalProvider>
        <Head>
          <title>Fireblocks Demo</title>
          <link rel="shortcut icon" href="/favicon.jpg" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              wordBreak: 'break-all',
              fontSize: '22px',
              bottom: '250px',
              position: 'relative',
              zIndex: '999',
              marginLeft: '150px',
            },
          }}
        />
        <AppLayout>
          <main
            className={`${
              router.asPath.endsWith('/') && router.asPath.endsWith('/signup')
                ? ''
                : 'table-wrap-outer'
            }`}
          >
            <Component {...pageProps} />
          </main>
        </AppLayout>
      </ModalProvider>
    </ApolloProvider>
    </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default CustomApp;
