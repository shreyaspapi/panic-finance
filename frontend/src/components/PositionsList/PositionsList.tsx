import React, { useState, useEffect } from "react";
import { Button, Divider, List, Typography, Avatar, Tag, Badge } from "antd";
import PositionModal from "../PositionsModal/PositionsModal";
import {
  mockDataFromUniswap,
  mockPositionsFromPanicSubgraph,
} from "../../utils/constants";
import ListItem from "../ListItem/ListItem";
import { Position } from "../../utils/types";
import {
  getPositionsDataFromPanicGraph,
  getPositionsDataFromUniswap,
} from "../../utils/dataUtils";
import { getPositionDataFromPanicGraphQuery } from "../../utils/queries";
import { useAccount, useConnect, useDisconnect, useContractWrite } from 'wagmi'
const { Text } = Typography;

function PositionsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [positionsFromUniswap, setPositionsFromUniswap] = useState(
    mockDataFromUniswap.data.positions
  );
  const [positionsFromPanicSubgraph, setPositionsFromPanicSubgraph] = useState(
    mockPositionsFromPanicSubgraph.data.userPositions
  );
  const [selectedTokenId, setSelectedTokenId] = useState("0xdummyaddress")

  const { address } = useAccount()

  useEffect(() => {
    const uniswapData = getPositionsDataFromUniswap(address?.toString() ?? "");
    const panicData = getPositionsDataFromPanicGraph();

    uniswapData.then((res) => {
      console.log("UNISWAP", res)
      setPositionsFromUniswap(res.positions);
    });

    panicData.then((res) => {
      console.log("PANIC", res)
      setPositionsFromPanicSubgraph(res.userPositions);
    });

  }, []);

  useEffect(() => {
    const sortedPostionsFromUniswap = positionsFromUniswap.sort((a, b) => {
      if (a.liquidity === "0") {
        return -1;
      } else if (b.liquidity === "0") {
        return 1;
      } else {
        return 0;
      }
    });
    sortedPostionsFromUniswap.reverse();
    setPositionsFromUniswap(sortedPostionsFromUniswap);
  }, [positionsFromUniswap]);

  // useEffect(() => {
  //   setPositionsFromUniswap(mockDataFromUniswap.data.positions);
  //   setPositionsFromPanicSubgraph(
  //     mockPositionsFromPanicSubgraph.data.userPositions
  //   );
  // }, []);

  function onPositionClick() { }

  const showModal = (tokenId: string) => {
    setSelectedTokenId(tokenId)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Divider orientation="left">Pools</Divider>
      <List
        style={{ maxWidth: "80%" }}
        header={<b>Your Positions</b>}
        itemLayout="horizontal"
        bordered
        size="large"
        dataSource={positionsFromUniswap}
        renderItem={(item: Position) => (
          <ListItem
            showModal={showModal}
            positionItem={item}
            positionsFromPanicSubgraph={positionsFromPanicSubgraph}
          />
        )}
      />
      <PositionModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        selectedTokenId={selectedTokenId}
        positionsFromPanic={positionsFromPanicSubgraph}
        positionsFromUniswap={positionsFromUniswap}
      />
    </>
  );
}

export default PositionsList;
