import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LiquidityIcon from '@mui/icons-material/MoneyOff';
import StreamsIcon from '@mui/icons-material/CloudDownload';
import SettingsIcon from '@mui/icons-material/Settings';
import ListItemButton from '@mui/material/ListItemButton';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

const StyledToolbar = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Sidebar = ({selectedPage, setSelectedPage}) => {

  const handleItemClick = (page) => {
    setSelectedPage(page);
  };

  return (
    <Box sx={{ zIndex: 1}}>
      <StyledDrawer variant="permanent" anchor="left">
      <StyledToolbar />
      <List sx={{pt: 5}}>
        <ListItemButton onClick={() => handleItemClick('liquidity')} selected={selectedPage === 'liquidity'}>
          <ListItemIcon>
            <LiquidityIcon />
          </ListItemIcon>
          <ListItemText primary="Liquidity" />
        </ListItemButton>
        <ListItemButton onClick={() => handleItemClick('streams')} selected={selectedPage === 'streams'}>
          <ListItemIcon>
            <StreamsIcon />
          </ListItemIcon>
          <ListItemText primary="Streams" />
        </ListItemButton>
        <ListItemButton onClick={() => handleItemClick('settings')} selected={selectedPage === 'settings'}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </StyledDrawer>
    </Box>
  );
};

export default Sidebar;
