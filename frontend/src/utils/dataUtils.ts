// Create a function to fetch data from subgraph endpoint using axios using the query given in queries.ts

import axios from "axios";
import {
  getPositionDataFromUniswapQuery,
  getPositionDataFromPanicGraphQuery,
} from "./queries";

import { UNISWAP_SUBGRAPH_URL, PANIC_SUBGRAPH_URL } from "./constants";

export const getPositionsDataFromUniswap = async () => {
  // const response = await axios.post(UNISWAP_SUBGRAPH_URL, {
  //     headers: {
  //         "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //         query: getPositionDataFromUniswapQuery,
  //     }),
  // })

  const response = await axios({
    method: "post",
    url: UNISWAP_SUBGRAPH_URL,
    data: {
      query: getPositionDataFromUniswapQuery,
    },
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  return response.data;
};

export const getPositionsDataFromPanicGraph = async () => {
  //   const response = await axios.post(PANIC_SUBGRAPH_URL, {
  //     Headers: {
  //         "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //         query: getPositionDataFromPanicGraphQuery,
  //     })
  //   });

  const result = await fetch(PANIC_SUBGRAPH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: getPositionDataFromPanicGraphQuery,
    }),
  }).then((res) => res.json());

  console.log(result);

};
