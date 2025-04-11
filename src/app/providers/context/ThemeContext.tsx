import React, { createContext, useState, useEffect } from 'react';

interface IThemeProviderProps {
  children: React.ReactNode
}

type Theme = 'light' | 'dark';

interface ThemeContextType {
  mode: Theme;
  toggleMode: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleMode: () => {},
});

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const [mode, setMode] = useState<Theme>(() => {
    const savedMode = localStorage.getItem('theme') as Theme | null;
    return savedMode || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};