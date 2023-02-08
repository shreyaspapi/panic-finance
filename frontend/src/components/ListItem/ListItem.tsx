import React from "react";
import { Typography, List, Avatar, Tag, Badge } from "antd";
import Title from "antd/es/typography/Title";
import { Position, PositionFromSubgraph } from "../../utils/types";
const { Text } = Typography;

type Props = {
  showModal: () => void;
  positionItem: Position;
  positionsFromPanicSubgraph: PositionFromSubgraph[];
};

function ListItem({
  showModal,
  positionItem,
  positionsFromPanicSubgraph,
}: Props) {
  const isMonitored = (
    position: PositionFromSubgraph,
    positionItem: Position
  ) => {
    if (position.tokenId === positionItem.id && position.check === true) {
      return true;
    }
    return false;
  };

  const badges = positionsFromPanicSubgraph.map((position) => {
    if (position.tokenId === positionItem.id) {
      if (position.check === true) {
        return position.tokenId;
      }
    }
    return "0";
  });

  return (
    <List.Item
      onClick={showModal}
      style={{
        cursor: "pointer",
      }}
    >
      <>
        <List.Item.Meta
          avatar={
            <Avatar src={"https://cryptologos.cc/logos/uniswap-uni-logo.png"} />
          }
          style={{ maxWidth: "5px" }}
        />
        <div>
          <Avatar size={32}>{positionItem.pool.token0.symbol}</Avatar>
          <Avatar size={32}>{positionItem.pool.token1.symbol}</Avatar>
        </div>
        <Title level={4} style={{ marginTop: "0.5em" }}>
          {positionItem.pool.token0.symbol} {"/"}{" "}
          {positionItem.pool.token1.symbol}
        </Title>

        <Typography.Text>Token ID: {positionItem.id}</Typography.Text>
        <Tag color="blue">
          {Number(positionItem.pool.feeTier) / 10000 + "%"}
        </Tag>
        {positionItem.liquidity === "0" ? (
          <Badge
            color="grey"
            text="Closed"
            title="Position is closed"
            style={{ minWidth: "10em", textAlign: "right" }}
          />
        ) : badges.includes(positionItem.id) ? (
          <Badge
            color="green"
            text="Monitored"
            title="Position is monitored"
            style={{ minWidth: "10em", textAlign: "right" }}
          />
        ) : (
          <Badge
            color="red"
            text="Not Monitored"
            title="Position is not monitored"
            style={{ minWidth: "10em", textAlign: "right" }}
          />
        )}
      </>
    </List.Item>
  );
}

export default ListItem;
