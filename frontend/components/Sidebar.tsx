import { Drawer, Button } from '@mui/material';
import { Box, List, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import HomeIcon from '@mui/icons-material/Home';
import { CompareArrows, WaterDrop } from '@mui/icons-material';
import LoginButton from './LoginButton';
import Image from 'next/image';
import LogoSvg from '../public/images/logo.svg';
import LogoWhiteSvg from '../public/images/logo-white.svg';
import Logo from '../components/Logo';
import { useState } from 'react';
import { StyledNavItem, StyledNavItemIcon } from './NavSection/styles'


type SidebarProps = {
    isDarkTheme: boolean;
    toggleTheme: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isDarkTheme, toggleTheme }) => {

    const router = useRouter();

    const handleClick = (route: string) => {
        router.push("/" + route);
    };

    const isCurrentRoute = (route: string) => {
        if (route === '/streams' && router.pathname === '/') {
            return true;
        }
        return router.pathname === route;
    };

    console.log(router.pathname);

    return (
        <Drawer variant="permanent" sx={{ borderRight: '1px dotted black' }}>
            <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
                <Logo />
            </Box>
            <Box sx={{ p: 2, alignItems: 'center', justifyContent: 'center', marginTop: 1, display: 'flex', flexDirection: 'column' }}>
                <Button startIcon={<CompareArrows />} onClick={() => handleClick('/streams')} size='large' sx={{ width: 220, borderRadius: 3, height: 48, m: 1 }} variant={isCurrentRoute("/streams") ? 'contained' : 'text'}>
                    Streams
                </Button>
                <Button startIcon={<WaterDrop />} onClick={() => handleClick('/lp')} size='large' sx={{ width: 220, borderRadius: 3, height: 48, m: 1 }} variant={isCurrentRoute("/lp") ? 'contained' : 'text'}>
                    Liquidity
                </Button>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ alignItems: 'center', justifyContent: 'center', }}>
                <LoginButton isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
            </Box>
        </Drawer>
    );
};

export default Sidebar;
