import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Login from './pages/login/Login';
import New from './pages/new/New';
import Single from './pages/single/Single';

const RoutesApp = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />

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
              <Route path="new" element={<New />} />
            </Route>

            <Route path="settings">
              <Route index element={<List />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RoutesApp;
