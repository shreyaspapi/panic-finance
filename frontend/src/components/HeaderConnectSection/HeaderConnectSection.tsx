import { Web3Button } from "@web3modal/react";
import { useState } from "react";
import { Button, Divider, Drawer } from "antd";
import Icon from "@ant-design/icons";

function HeaderConnectSection() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const bellNotification = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.1214 3.33333C10.6511 3.33333 7.94687 5.96017 7.94687 9.07017V11.9219C7.94687 12.2556 7.80884 12.5572 7.7294 12.7184C7.62932 12.9215 7.49696 13.1397 7.35313 13.3573C7.06365 13.7951 6.67438 14.31 6.25699 14.8335C5.68797 15.5473 5.56022 16.3826 5.74677 17.0356C5.926 17.663 6.39731 18.1573 7.18447 18.2878C9.00895 18.5904 11.3398 18.8333 14.1214 18.8333C17.1081 18.8333 19.3938 18.5533 21.0497 18.2238C21.6961 18.0952 22.0804 17.6969 22.2441 17.1851C22.4164 16.6465 22.3516 15.934 21.9353 15.266C21.7453 14.9611 21.5414 14.65 21.337 14.3398C21.3161 14.308 21.2951 14.2761 21.2741 14.2443C21.0931 13.9696 20.9118 13.6945 20.7504 13.4391C20.5722 13.1569 20.4017 12.8729 20.2732 12.616C20.1696 12.4086 20 12.0459 20 11.6667V8.99726C20 5.84702 17.5498 3.33333 14.1214 3.33333ZM5.94687 9.07017C5.94687 4.73887 9.66697 1.33333 14.1214 1.33333C18.6178 1.33333 22 4.70618 22 8.99726V11.5841C22.0097 11.609 22.0284 11.6542 22.0621 11.7217C22.1448 11.8871 22.2723 12.1034 22.4413 12.371C22.5917 12.609 22.7618 12.8672 22.945 13.1451C22.9655 13.1763 22.9863 13.2078 23.0072 13.2396C23.2114 13.5495 23.4279 13.8796 23.6327 14.2082C24.3315 15.3294 24.5158 16.648 24.149 17.7945C23.7737 18.9678 22.8309 19.9086 21.44 20.1854C19.6504 20.5414 17.2338 20.8333 14.1214 20.8333C11.2231 20.8333 8.78266 20.5802 6.85728 20.2609C5.26597 19.997 4.20329 18.9138 3.8237 17.585C3.45143 16.2818 3.74002 14.7823 4.69317 13.5868C5.09702 13.0802 5.44365 12.619 5.68475 12.2543C5.80622 12.0706 5.88782 11.9309 5.93538 11.8344C5.9397 11.8256 5.94351 11.8176 5.94687 11.8105V9.07017ZM18.2852 22.7141C18.6272 23.1478 18.5528 23.7766 18.1192 24.1186C15.7978 25.949 12.226 25.9721 9.87991 24.1179C9.44662 23.7754 9.37297 23.1466 9.71542 22.7133C10.0579 22.28 10.6867 22.2063 11.12 22.5488C12.7335 23.824 15.28 23.8104 16.8808 22.5481C17.3145 22.2061 17.9432 22.2805 18.2852 22.7141Z"
        fill="#000000"
      />
    </svg>
  );

  return (
    <div
      style={{
        display: "flex",
        width: "40%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <div style={{ margin: "25px" }}>
        <Web3Button />
      </div>
      <Divider type="vertical" style={{ height: "50px" }} />
      {/* Button width 60 px , bell-notification svg and number 4 side by side, with a gradiant yellow to blue  */}
      <Button
        onClick={showDrawer}
        style={{
          display: "flex",
          width: "60px",
          height: "37px",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
          }}
        >
          <Icon component={bellNotification} />
          <p style={{ fontSize: "14px", color: "black", margin: "2px" }}>4</p>
        </div>
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
}

export default HeaderConnectSection;
