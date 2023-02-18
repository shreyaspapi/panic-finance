import { Typography } from "antd";
import React from "react";
import MigrateWidget from "../../components/MigrateWidget/MigrateWidget";

function MigratePage() {
  return (
    <div>
      <div className="text">
        <Typography.Title>PANIC TRANSFER</Typography.Title>
        <Typography.Paragraph>
          Oops! If you're worried about accidentally exposing your private key,
          don't fret! Simply use the "transfer all" feature to move your assets
          to a new wallet address. This way, you can keep your assets safe and
          secure.
        </Typography.Paragraph>
      </div>
      <MigrateWidget />
    </div>
  );
}

export default MigratePage;
