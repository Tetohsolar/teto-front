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
import BusinessList from '../pages/business/list';
import SizingList from '../pages/sizings/list';
import ProductList from '../pages/products/list';
import Settings from '../pages/settings';
import EditClient from '../pages/customers/edit';
import AfflitedList from '../pages/afflited/list';
import NewAfflited from '../pages/afflited/new';
import EditAfflited from '../pages/afflited/edit';
import NewProduct from '../pages/products/new';
import EditProduct from '../pages/products/edit';
import NewBusiness from '../pages/business/new';
import SingleBusiness from '../pages/business/single';
import ViewBusiness from '../pages/business/view';
import EditPersonalData from "../pages/business/view/editpersonal"
import EditBusiness from '../pages/business/proporse';
import ValoresProposta from '../components/business-form/valoresPropform';

const RoutesApp = () => {
  const { token } = useContext(AuthContext)
  // const token = localStorage.getItem('token')
  // console.log(`toke nav: ${token}`)
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={token ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="customers">
              <Route
                index
                element={token ? <CustomerList /> : <Navigate to="/login" />}
              />
              <Route
                path=":clientId"
                element={token ? <Single /> : <Navigate to="/login" />}
              />
              <Route
                path="new"
                element={token ? <NewClient /> : <Navigate to="/login" />}
              />
              <Route
                path="edit/:clientId"
                element={token ? <EditClient /> : <Navigate to="/login" />}
              />
            </Route>

            <Route path="business">
              <Route index element={token ? <BusinessList /> : <Navigate to="/login" />} />
              <Route path=":projectId" element={token ? <SingleBusiness /> : <Navigate to="/login" />} />
              <Route path="new" element={token ? <NewBusiness /> : <Navigate to="/login" />} />
              <Route path="create" element={token ? <EditBusiness /> : <Navigate to="/login" />} />
              <Route path="view/:businessId" element={token ?<ViewBusiness /> : <Navigate to="/login"/>} />
              <Route path="view/editvaluebussines/:businessId" element={<ValoresProposta/>}  />
            </Route>

            <Route path="sizings">
              <Route
                index
                element={token ? <SizingList /> : <Navigate to="/login" />}
              />
              <Route
                path="new"
                element={token ? <New /> : <Navigate to="/login" />}
              />
            </Route>

            <Route path="products">
              <Route
                index
                element={token ? <ProductList /> : <Navigate to="/login" />}
              />
              <Route
                path=":productId"
                element={token ? <Single /> : <Navigate to="/login" />}
              />
              <Route
                path="new"
                element={token ? <NewProduct /> : <Navigate to="/login" />}
              />
              <Route
                path="edit/:Id"
                element={token ? <EditProduct /> : <Navigate to="/login" />}
              />
            </Route>

            <Route path="users">
              <Route
                index
                element={token ? <List /> : <Navigate to="/login" />}
              />
              <Route
                path=":userId"
                element={token ? <Single /> : <Navigate to="/login" />}
              />
              <Route
                path="new"
                element={token ? <NewUSer /> : <Navigate to="/login" />}
              />
              <Route
                path="new/:userId"
                element={token ? <NewUSer /> : <Navigate to="/login" />}
              />
              <Route
                path="/users/edit/:userId"
                element={token ? <EditUser /> : <Navigate to="/login" />}
              />
            </Route>

            <Route path="settings">
              <Route
                index
                element={token ? <Settings /> : <Navigate to="/login" />}
              />
            </Route>

            <Route path="affliteds">
              <Route
                index
                element={token ? <AfflitedList /> : <Navigate to="/login" />}
              />
              <Route
                path=":productId"
                element={token ? <Single /> : <Navigate to="/login" />}
              />
              <Route
                path="new"
                element={token ? <NewAfflited /> : <Navigate to="/login" />}
              />
              <Route
                path="edit/:clientId"
                element={token ? <EditAfflited /> : <Navigate to="/login" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RoutesApp;
