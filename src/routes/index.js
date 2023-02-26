import { Routes, Switch } from 'react-router-dom';
import Route from './Route'
import Home from '../pages/home/Home';
import List from '../pages/list/List';
import Login from '../pages/login/Login';
import New from '../pages/new/New';
import Signup from '../pages/signup/Signup';
import Single from '../pages/single/Single';
import NewUSer from '../pages/users/new';





const RoutesApp = () => {
  return (
    <div>

      <Switch>
        <Route exact path="/" component={Home}  />
        <Route exact path="/login" component={Login} />
        <Route exact path="/users" component={NewUSer} />
        <Route exact path="/signup" component={Signup} />
        {/* <Route path="/">
          <Route index component={<Home />} />
          <Route path="login" component={<Login />} />
          <Route path="signup" component={<Signup />} />


          <Route path="clients">
            <Route index component={<List />} />
            <Route path=":clientId" component={<Single />} />
            <Route path="new" component={<New />} />
          </Route>

          <Route path="projects">
            <Route index component={<List />} />
            <Route path=":projectId" component={<Single />} />
            <Route path="new" component={<New />} />
          </Route>

          <Route path="sizing">
            <Route index component={<List />} />
            <Route path=":sizingId" component={<Single />} />
            <Route path="new" component={<New />} />
          </Route>

          <Route path="products">
            <Route index component={<List />} />
            <Route path=":productId" component={<Single />} />
            <Route path="new" component={<New />} />
          </Route>

          <Route path="users">
            <Route index component={<List />} />
            <Route path=":userId" component={<Single />} />
            <Route path="new" component={<NewUSer />} />
          </Route>

          <Route path="settings">
            <Route index component={<List />} />
          </Route>

        </Route> */}
      </Switch>


    </div>
  );
};

export default RoutesApp;
