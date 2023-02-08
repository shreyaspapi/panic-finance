export const UNISWAP_SUBGRAPH_URL = "https://thegraph.com/hosted-service/subgraph/liqwiz/uniswap-v3-goerli";
export const PANIC_SUBGRAPH_URL = "https://thegraph.com/hosted-service/subgraph/shreyaspapi/panic-finance";

export const mockDataFromUniswap = {
  data: {
    positions: [
      {
        id: "47746",
        owner: "0x94f1ba9b10f6bbb14585296b6e54170c21acfc2a",
        pool: {
          feeTier: "3000",
          token0: {
            name: "fDAI Fake Token",
            symbol: "fDAI",
          },
          token1: {
            name: "USDC fake",
            symbol: "USDC",
          },
        },
        liquidity: "0",
      },
      {
        id: "47748",
        owner: "0x94f1ba9b10f6bbb14585296b6e54170c21acfc2a",
        pool: {
          feeTier: "3000",
          token0: {
            name: "fDAI Fake Token",
            symbol: "fDAI",
          },
          token1: {
            name: "USDC fake",
            symbol: "USDC",
          },
        },
        liquidity: "0",
      },
      {
        id: "47753",
        owner: "0x94f1ba9b10f6bbb14585296b6e54170c21acfc2a",
        pool: {
          feeTier: "3000",
          token0: {
            name: "fDAI Fake Token",
            symbol: "fDAI",
          },
          token1: {
            name: "USDC fake",
            symbol: "USDC",
          },
        },
        liquidity: "100",
      },
      {
        id: "47855",
        owner: "0x94f1ba9b10f6bbb14585296b6e54170c21acfc2a",
        pool: {
          feeTier: "3000",
          token0: {
            name: "fDAI Fake Token",
            symbol: "fDAI",
          },
          token1: {
            name: "USDC fake",
            symbol: "USDC",
          },
        },
        liquidity: "170263627351946718888",
      },
    ],
  },
};

export const mockPositionsFromPanicSubgraph = {
  data: {
    userPositions: [
      {
        id: "0x94f1ba9b10f6bbb14585296b6e54170c21acfc2a-47855",
        tokenId: "47855",
        token0: "0x88271d333c72e51516b67f5567c728e702b3eee8",
        token1: "0xc1005df7e0a2fce579daf54d478102aee128edf3",
        check: true,
      },
    ],
  },
};
