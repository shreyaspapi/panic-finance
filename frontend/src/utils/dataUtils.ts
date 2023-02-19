import axios from "axios";
import {
  getPositionDataFromUniswapQuery,
  getPositionDataFromPanicGraphQuery,
} from "./queries";

import { UNISWAP_SUBGRAPH_URL, PANIC_SUBGRAPH_URL } from "./constants";

export const getPositionsDataFromUniswap = async (address: string) => {



  const result = await fetch(UNISWAP_SUBGRAPH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: getPositionDataFromUniswapQuery.replace("REPLACE_ADDRESS", address),
    }),
  }).then((res) => res.json());

  return result.data;
};

export const getPositionsDataFromPanicGraph = async () => {

  const result = await fetch(PANIC_SUBGRAPH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: getPositionDataFromPanicGraphQuery,
    }),
  }).then((res) => res.json());

  return result.data;
};
