import { useState } from 'react';
import { Switch } from '@mui/material';
import { darkTheme } from '../styles/theme';
import { lightTheme } from '../theme';

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Switch checked={isDarkMode} onChange={handleToggleTheme} />
  );
};

export default ThemeToggle;
