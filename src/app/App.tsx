import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import { ThemeProvider as AppThemeProvider, SelectedNoteProvider } from './providers';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { darkTheme, lightTheme } from '../models/constants';
import { useTheme } from '../hooks';

export const App = () => {

  const { mode } = useTheme();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppThemeProvider>
          <MuiThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
            <SelectedNoteProvider>
              <AppRoutes />
            </SelectedNoteProvider>
          </MuiThemeProvider>
        </AppThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};
