import { Navigate } from 'react-router-dom';
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';


const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext)

  const auth = token;
  console.log(auth)
  if (auth === '') {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ProtectedRoute;