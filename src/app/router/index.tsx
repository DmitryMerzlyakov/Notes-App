import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage } from '../../components/pages';
import { PrivateRoute } from '../../components/wrapper';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } 
        />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

