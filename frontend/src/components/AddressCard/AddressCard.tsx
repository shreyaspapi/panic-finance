import { Card, Typography } from "antd";
import React, { useState } from "react";
import styles from "./styles.module.css";
import PolygonLogo from "./../../assets/svg/polygon-matic-logo.svg";

type cardData = {
  network: String;
  address: String;
};

function AddressCard({ network, address }: cardData) {
  const [numOfNfts, setNumOfNfts] = useState(5);
  const [numOfTokens, setNumOfTokens] = useState(14);

  return (
    <Card className={styles.addressCard}>
      <img src={PolygonLogo} width={100} alt="Chain logo" />
      <Typography.Paragraph>
        {numOfTokens} tokens, {numOfNfts} NFT's
      </Typography.Paragraph>
      <Typography.Title>{address}</Typography.Title>
    </Card>
  );
}

export default AddressCard;
