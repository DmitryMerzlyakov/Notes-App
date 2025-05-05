import { Navigate } from 'react-router-dom';

interface IPrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const user = sessionStorage.getItem('userId');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
