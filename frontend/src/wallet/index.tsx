import { EthereumClient, modalConnectors } from "@web3modal/ethereum";
import { createClient, configureChains, goerli } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";


const { chains, provider } = configureChains(
  [goerli],
  [
    infuraProvider({
      apiKey: process.env.REACT_APP_GOERLI_INFURA_API || "",
      priority: 0,
    }),
    publicProvider({ priority: 1 }),
  ]
);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
export const ethereumClient = new EthereumClient(wagmiClient, chains);