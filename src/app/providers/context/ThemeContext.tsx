import { createContext } from 'react';
import { useTheme } from '../../../hooks';

interface IThemeProviderProps {
    children: React.ReactNode
}

interface IThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<IThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};