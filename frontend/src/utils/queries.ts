export const getPositionDataFromUniswapQuery = `query {
  positions(where: {owner: "REPLACE_ADDRESS"}) {
    id
    owner
    pool {
      feeTier
      token0 {
        name
        symbol
      }
      token1 {
        name
        symbol
      }
    }
    liquidity
  }
}`;

export const getPositionDataFromPanicGraphQuery = `query {
  userPositions(first: 100) {
    id
    tokenId
    token0
    token1
    check
  }
}`;

