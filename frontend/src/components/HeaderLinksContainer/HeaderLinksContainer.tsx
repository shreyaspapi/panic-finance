import { Button } from "antd";
import React from "react";

function HeaderLinksContainer() {
  return (
    <div
      style={{
        display: "flex",
        width: "60%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button type="link" size="large" style={{ margin: "50px" }}>
        TWITTER
      </Button>
      <Button type="link" size="large" style={{ margin: "50px" }}>
        DOCS
      </Button>
      <Button type="link" size="large" style={{ margin: "50px" }}>
        GITHUB
      </Button>
    </div>
  );
}

export default HeaderLinksContainer;
