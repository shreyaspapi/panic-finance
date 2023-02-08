import { Typography } from "antd";
import React from "react";
import PositionsList from "../../components/PositionsList/PositionsList";

function ManageLPPage() {
  return (
    <>
      <Typography.Title>Manage Liquidity</Typography.Title>
      <PositionsList />
    </>
  );
}

export default ManageLPPage;
