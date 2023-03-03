import RoutesApp from '../src/routes/';
import AuthProvider from './context/AuthContext';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <ToastContainer />
        <RoutesApp />
      </AuthProvider>
    </div>
  );
}

export default App;
