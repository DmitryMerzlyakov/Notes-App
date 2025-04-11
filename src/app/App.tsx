import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import { SelectedNoteProvider, ThemeProvider } from './providers';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <SelectedNoteProvider>
            <AppRoutes />
          </SelectedNoteProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};
