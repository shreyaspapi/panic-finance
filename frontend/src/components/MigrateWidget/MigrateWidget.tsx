import React, { useState } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { Button } from "antd";

function MigrateWidget() {
  const [network, setNetwork] = useState("polygon");
  const [fromAddress, setFromAddress] = useState("0x245289472893473472893479");
  const [toAddress, setToAddress] = useState("0x232984723984729834792837498");

  return (
    <div className={styles.outerContainer}>
      <div className={styles.widgetContainer}>
        <AddressCard network={network} address={fromAddress} />
        <ArrowRightOutlined className={styles.arrowIcon} />
        <AddressCard network={network} address={toAddress} />
      </div>
      <Button className={styles.transferButton} size="large">
        TRANSFER
      </Button>
    </div>
  );
}

export default MigrateWidget;
