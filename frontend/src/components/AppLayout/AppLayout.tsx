import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  ContainerOutlined,
  TeamOutlined,
  UserOutlined,
  DoubleRightOutlined,
  SettingOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Web3Button } from "@web3modal/react";
import { Link } from "react-router-dom";
import HeaderLinksContainer from "../HeaderLinksContainer/HeaderLinksContainer";
import HeaderConnectSection from "../HeaderConnectSection/HeaderConnectSection";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  { name: "PANIC", key: "1", icon: <DoubleRightOutlined />, url: "" },
  {
    name: "LIQUIDITY",
    key: "2",
    icon: <ContainerOutlined />,
    url: "manage-lp",
  },
  { name: "STREAMS", key: "3", icon: <LinkOutlined />, url: "links" },
  { name: "SETTINGS", key: "4", icon: <SettingOutlined />, url: "settings" },
];

type Props = {
  children?: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        width={250}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 64,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        ></div>
        <Menu
          theme="dark"
          mode="inline"
          items={items.map((_, index) => {
            const key = index + 1;
            return {
              key,
              icon: items[index].icon,
              label: (
                <Link to={"/" + items[index].url}>{items[index].name}</Link>
              ),
            };
          })}
          style={{ paddingTop: "25px" }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: "10px",
            background: colorBgContainer,
            display: "flex",
          }}
        >
          <HeaderLinksContainer />
          <HeaderConnectSection />
        </Header>
        <Content
          style={{
            margin: "40px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {/* <div style={{ padding: 24 }}>{children}</div> */}
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>Panic Finance ©2023</Footer>
      </Layout>
    </Layout>
  );
}
