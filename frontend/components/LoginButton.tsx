import { IconButton } from '@mui/material';
import { Brightness4 as Brightness4Icon } from '@mui/icons-material';
import { DarkMode } from '@mui/icons-material';

interface LoginButtonProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ isDarkTheme, toggleTheme }) => {
  return (
    // add padding to the IconButton
    <IconButton sx={{ p: 2 }} color="inherit" onClick={toggleTheme}>
      <DarkMode />
    </IconButton>
  );
};

export default LoginButton;