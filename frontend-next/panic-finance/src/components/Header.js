import { AppBar, Toolbar, IconButton, Switch, Box, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import AdbIcon from '@mui/icons-material/Adb';

import {
  ConnectButton
} from "@rainbow-me/rainbowkit";

function Header({ darkMode, setDarkMode }) {
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Box sx={{ zIndex: 5 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>

        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Panic Finance
          </Typography>

          {/*  Add spacing bettween the title and the social icons */}
          <Box sx={{ flexGrow: 1, ml: 5 }}>
            <IconButton
              color="inherit"
              href="https://github.com"
              target="_blank"
              rel="noopener"
              aria-label="github"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://twitter.com"
              target="_blank"
              rel="noopener"
              aria-label="twitter"
            >
              <TwitterIcon />
            </IconButton>
          </Box>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
        >
          <ConnectButton accountStatus={{
    smallScreen: 'avatar',
    largeScreen: 'full',
  }} />
        </div>

          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

// export default function ButtonAppBar() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             News
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }