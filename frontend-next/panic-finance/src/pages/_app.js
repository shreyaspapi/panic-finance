import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../styles/theme';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import "@rainbow-me/rainbowkit/styles.css";
import {
    getDefaultWallets,
    RainbowKitProvider,
    darkTheme as rainbowDarkTheme,
    lightTheme as rainbowLightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { mainnet, polygon } from 'wagmi/chains';

import Streams from './_streams';


const { chains, provider } = configureChains(
    [mainnet, polygon],
    [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: "Panic Finance",
    chains
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
});

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [selectedPage, setSelectedPage] = useState('liquidity'); // add selected page state

    const theme = darkMode === false ? lightTheme : darkTheme;
    const rainbowTheme = darkMode === false ? rainbowLightTheme() : rainbowDarkTheme();

    const handlePageChange = (page) => {
        setSelectedPage(page);
    };

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider theme={rainbowTheme} chains={chains}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                        <div style={{ display: 'flex', flexGrow: 1 }}>
                            <Sidebar onPageChange={handlePageChange} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                            <main style={{ flexGrow: 1, marginTop: '64px', maxWidth: '82vw', maxHeight: '80vh' }}>
                                {selectedPage === 'liquidity' && <p>Liquidity page content goes here</p>}
                                {selectedPage === 'streams' && <Streams />}
                                {selectedPage === 'settings' && <p>Settings page content goes here</p>}
                            </main>
                        </div>
                    </div>
                </ThemeProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default App;
