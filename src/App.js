import RoutesApp from '../src/routes/';
import AuthProvider from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <BrowserRouter>
          <RoutesApp />
        </BrowserRouter>
      </AuthProvider>





    </div>
  );
}

export default App;
