import { Navigate } from 'react-router-dom';
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';


const ProtectedRoute = ({ isSigned, children }) => {


  if (!isSigned) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ProtectedRoute;