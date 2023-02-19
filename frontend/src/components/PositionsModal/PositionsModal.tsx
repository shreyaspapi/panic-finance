import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal } from "antd";

import { PositionFromSubgraph, Position } from "../../utils/types";

type Props = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  selectedTokenId: string;
  positionsFromUniswap: Position[];
  positionsFromPanic: PositionFromSubgraph[];
};

function PositionModal({
  isModalOpen,
  handleOk,
  handleCancel,
  selectedTokenId,
  positionsFromPanic,
  positionsFromUniswap
}: Props) {

  const [monitored, setMonitored] = useState(false);

  useEffect(() => {
    positionsFromPanic.forEach((ele) => {
      if (ele.tokenId === selectedTokenId) {
        setMonitored(true);
      }
    });

  }, [])

  return (
    <Modal
      title="Position Details"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={"Save"}
      cancelButtonProps={{ hidden: true }}
    >
      <>
        <p>Token ID: {selectedTokenId}</p>

        {
          positionsFromUniswap.map((ele) => {
            if (ele.id == selectedTokenId) {
              return (
                <p>
                  {"Tokens: "}
                  {ele.pool.token0.symbol}
                  {"/"}
                  {ele.pool.token1.symbol}
                </p>
              )
            }
          })}
        {
          positionsFromUniswap.map((ele) => {
            return positionsFromPanic.map((ele2) => {
              if (selectedTokenId === ele.id && ele.id === ele2.tokenId) {
                return (
                  <p>Currently monitoring the position for 5% impermanent loss.</p>
                )
              }
            })
          })
        }

        {
          monitored === false ? (
            <Button type="primary">
              "Monitor Position"
            </Button>
          ) : <></>
        }
      </>
    </Modal>
  );
}

export default PositionModal;
