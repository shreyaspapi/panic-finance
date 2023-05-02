import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" elevation={0} color='transparent' sx={{ p: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <ConnectButton />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
