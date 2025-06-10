import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from '@/app/providers';

export const ThemeToggle = () => {

  const { mode, toggleThemeMode } = useThemeMode();

  return (
    <IconButton onClick={toggleThemeMode} color="inherit">
      {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
};
