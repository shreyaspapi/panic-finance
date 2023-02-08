import React from "react";
import { Web3Modal } from "@web3modal/react";

import { WagmiConfig } from "wagmi";

import { wagmiClient, ethereumClient } from "./wallet";
import AppLayout from "./components/AppLayout/AppLayout";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import MigratePage from "./pages/MigratePage/MigratePage";
import ManageLPPage from "./pages/ManageLPPage/ManageLPPage";
import LinksPage from "./pages/LinksPage/LinksPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <AppLayout children={<MigratePage />} />
      </>
    ),
  },
  {
    path: "/manage-lp",
    element: (
      <>
        <AppLayout children={<ManageLPPage />} />
      </>
    ),
  },
  {
    path: "/links",
    element: (
      <>
        <AppLayout children={<LinksPage />} />
      </>
    ),
  },
  {
    path: "/settings",
    element: (
      <>
        <AppLayout children={<SettingsPage />} />
      </>
    ),
  },
]);

const App: React.FC = () => {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RouterProvider router={router} />
      </WagmiConfig>

      <Web3Modal
        projectId={process.env.REACT_APP_PROCESS_ID}
        ethereumClient={ethereumClient}
      />
    </>
  );
};

export default App;
