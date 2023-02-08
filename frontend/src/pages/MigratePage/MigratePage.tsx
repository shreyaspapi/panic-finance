import { Typography } from "antd";
import React from "react";

function MigratePage() {
  return (
    <>
      <div className="text">
        <Typography.Title>PANIC TRANSFER</Typography.Title>
        <Typography.Paragraph>
          Oops! If you're worried about accidentally exposing your private key,
          don't fret! Simply use the "transfer all" feature to move your assets
          to a new wallet address. This way, you can keep your assets safe and
          secure.
        </Typography.Paragraph>
      </div>
      <div className="widget"></div>
    </>
  );
}

export default MigratePage;
