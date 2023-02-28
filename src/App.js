import RoutesApp from '../src/routes/';
import AuthProvider from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
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
