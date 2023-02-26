import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';
import List from '../pages/list/List';
import Login from '../pages/login/Login';
import New from '../pages/new/New';
import Signup from '../pages/signup/Signup';
import Single from '../pages/single/Single';
import NewUSer from '../pages/users/new';
import ProtectedRoute from "./protectedRoute";





const RoutesApp = () => {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>


            } />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />



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
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route path="new" element={<NewUSer />} />
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
