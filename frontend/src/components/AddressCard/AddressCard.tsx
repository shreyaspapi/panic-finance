import { Card, Typography, Input } from "antd";
import React, { useState } from "react";
import styles from "./styles.module.css";
import PolygonLogo from "./../../assets/svg/polygon-matic-logo.svg";


type cardData = {
  network: String;
  address: String;
  type: String;
  itemsCount: Number;
  setNewAddress: (newAddress: string) => void;
};

function AddressCard({ network, address, type, itemsCount, setNewAddress }: cardData) {
  const [numOfNfts, setNumOfNfts] = useState(5);
  const [numOfTokens, setNumOfTokens] = useState(14);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewAddress(e.target.value)
  };

  return (
    <Card className={styles.addressCard}>
      <img src={PolygonLogo} width={70} alt="Chain logo" />
      {type === "from" ? (
        <>
          <Typography.Paragraph>
            {itemsCount.toString()} tokens, {numOfNfts} NFT's
          </Typography.Paragraph>
          <Typography.Paragraph>{address}</Typography.Paragraph>
        </>
      ) : (
        <>
          <Typography.Paragraph>Enter new address</Typography.Paragraph>
          <Input placeholder="New address" onChange={onChange} />
        </>
      )}

    </Card>
  );
}

export default AddressCard;
