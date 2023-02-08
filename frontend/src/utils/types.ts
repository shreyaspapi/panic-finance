export type Position = {
  id: string;
  owner: string;
  pool: {
    feeTier: string;
    token0: {
      name: string;
      symbol: string;
    };
    token1: {
      name: string;
      symbol: string;
    };
  };
  liquidity: string;
};

export type PositionFromSubgraph = {
  id: string;
  tokenId: string;
  token0: string;
  token1: string;
  check: boolean;
};
