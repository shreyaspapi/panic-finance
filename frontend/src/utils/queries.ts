export const getPositionDataFromUniswapQuery = `query {
  positions(where: {owner: "0x94f1ba9b10F6BBB14585296b6E54170c21Acfc2A"}) {
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
  userPositions(first: 5) {
    id
    tokenId
    token0
    token1
    check
  }
}`;

