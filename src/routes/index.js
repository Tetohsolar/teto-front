import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/home/Home';
import List from '../pages/list/List';
import Login from '../pages/login/Login';
import New from '../pages/new/New';
import Signup from '../pages/signup/Signup';
import Single from '../pages/single/Single';
import NewUSer from '../pages/users/new';
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';



const RoutesApp = () => {

  const { token } = useContext(AuthContext)




  return (
    <div>

      <BrowserRouter>

        <Routes>
          <Route path="/">
            <Route index element={token ? <Home /> : <Navigate to="/login" />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={token ? <Signup /> : <Navigate to="/login" />} />



            <Route path="clients">
              <Route index element={<List />} />
              <Route path=":clientId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>

            <Route path="projects">
              <Route index element={<List />} />
              <Route path=":projectId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>

            <Route path="sizing">
              <Route index element={<List />} />
              <Route path=":sizingId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>

            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>

            <Route path="users">
              {/* token ? <Signup /> : <Navigate to="/login" /> */}

              <Route index element={token ? <List /> : <Navigate to="/login" />} />
              <Route path=":userId" element={token ? <Single /> : <Navigate to="/login" />} />
              <Route path="new" element={token ? <NewUSer /> : <Navigate to="/login" />} />
            </Route>

            <Route path="settings">
              <Route index element={<List />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>


    </div >
  );
};

export default RoutesApp;
