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

import NewClient from '../pages/customers/new';
import EditUser from '../pages/users/edit';
import CustomerList from '../pages/customers/list';
import ProjectsList from '../pages/projects/list';
import SizingList from '../pages/sizings/list';
import ProductList from '../pages/products/list';
import Settings from '../pages/settings';
import EditClient from '../pages/customers/edit';
import AfflitedList from '../pages/afflited/list';
import NewAfflited from '../pages/afflited/new';
import EditAfflited from '../pages/afflited/edit';


const RoutesApp = () => {

  const { token } = useContext(AuthContext)




  return (
    <div>

      <BrowserRouter>

        <Routes>
          <Route path="/">
            <Route index element={token ? <Home /> : <Navigate to="/login" />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            <Route path="customers">
              <Route index element={<CustomerList />} />
              <Route path=":clientId" element={<Single />} />
              <Route path="new" element={<NewClient />} />
              <Route path="edit/:clientId" element={<EditClient />} />
            </Route>

            <Route path="projects">
              <Route index element={<ProjectsList />} />
              <Route path=":projectId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>

            <Route path="sizings">
              <Route index element={<SizingList />} />
              <Route path=":sizingId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>

            <Route path="products">
              <Route index element={<ProductList />} />
              <Route path=":productId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>

            <Route path="users">

              <Route index element={token ? <List /> : <Navigate to="/login" />} />

              <Route path=":userId" element={token ? <Single /> : <Navigate to="/login" />} />

              <Route path="new" element={token ? <NewUSer /> : <Navigate to="/login" />} />

              <Route path="new/:userId" element={token ? <NewUSer /> : <Navigate to="/login" />} />

              <Route path="/users/edit/:userId" element={token ? <EditUser /> : <Navigate to="/login" />} />
            </Route>

            <Route path="settings">
              <Route index element={<Settings />} />
            </Route>

            <Route path="affliteds">
              <Route index element={<AfflitedList />} />
              <Route path=":productId" element={<Single />} />
              <Route path="new" element={<NewAfflited />} />
              <Route path="edit/:clientId" element={<EditAfflited />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>


    </div >
  );
};

export default RoutesApp;
