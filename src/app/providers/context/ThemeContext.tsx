import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface IThemeProviderProps {
  children: React.ReactNode;
}

type PaletteMode = 'light' | 'dark';

const ThemeContext = createContext({
  mode: "light",
  toggleThemeMode: () => { }
});

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeMode = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode as PaletteMode);
    }
  }, []);

  const toggleThemeMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const theme = createTheme({
    palette: {
      mode
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleThemeMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
