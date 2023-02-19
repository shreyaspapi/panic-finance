import React, { useState, useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import getUserData from "../../utils/getUserData";
import { panicFinanceABI } from "../../utils/abis";
import { Button, Card, Typography } from "antd";
import { useAccount, useConnect, useDisconnect, useContractWrite } from 'wagmi'


const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
  display: 'flex',
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}

function MigrateWidget() {
  const [network, setNetwork] = useState("polygon");
  const [fromAddress, setFromAddress] = useState("0x245289472893473472893479");
  const [toAddress, setToAddress] = useState("0x232984723984729834792837498");
  const [itemsPage, setItemsPage] = useState(false)
  const [items, setItems]: any[] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const { address, isConnected } = useAccount()


  useEffect(() => {
    getUserData(address?.toString() ?? "").then((data) => {
      console.log(data);
      setItems(data.data.items);
      setItemsCount(data.data.items.length);
    });
  }, [])

  const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const setNewAddress = (newAddress: string) => {
    setToAddress(newAddress);
  }

  const { data, isLoading, isSuccess, write } = useContractWrite({
    abi: panicFinanceABI,
    address: "0xBBaeF0aA571583ddb05c6Af6265Fc8ff3A751805",
    functionName: "assetsTransfer",
    args: [toAddress, ["0x88271d333C72e51516B67f5567c728E702b3eeE8", "0x53d00397f03147a9bd9c40443a105a82780deaf1", "0xc94dd466416a7dfe166ab2cf916d3875c049ebb7"], []],
    mode: "recklesslyUnprepared"
  })


  return (
    <div className={styles.outerContainer}>
      {itemsPage === false ?
        (<>
          <div className={styles.widgetContainer}>
            <AddressCard network={network} address={address ?? ""} setNewAddress={setNewAddress} type="from" itemsCount={itemsCount} />
            <ArrowRightOutlined className={styles.arrowIcon} />
            <AddressCard network={network} address={toAddress} setNewAddress={setNewAddress} type="to" itemsCount={itemsCount} />
          </div>
          <Button className={styles.transferButton} size="large" onClick={() => setItemsPage(true)}>
            NEXT
          </Button>
        </>)
        :
        (
          <>
            <div className={styles.assetContainer}>
              <Card title="User Tokens">
                {items?.map((item: any) => (
                  <Card.Grid >
                    <img src={item.logo_url} width={50} height={50} />
                    <Typography.Paragraph>{item.contract_name}</Typography.Paragraph>
                    <Typography.Paragraph>{item.contract_ticker_symbol}</Typography.Paragraph>

                  </Card.Grid>
                ))
                }

              </Card>
              <Button className={styles.transferButton} size="large" onClick={() => setItemsPage(false)}>
                BACK
              </Button>
              <Button className={styles.transferButton} size="large" onClick={() => write?.()}>
                APPROVE ALL
              </Button>
            </div>
          </>
        )
      }
    </div>
  );
}

export default MigrateWidget;
