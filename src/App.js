import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import
  {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";


import Messenger from "./pages/messenger/Messenger";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Library from "./pages/library/Library";
import Users from "./pages/users/Users";
function App ()
{
  const { user } = useContext( AuthContext );
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          { user ? <Home /> : <Register /> }
        </Route>
        <Route path="/login">{ user ? <Redirect to="/" /> : <Login /> }</Route>
        <Route path="/register">
          { user ? <Redirect to="/" /> : <Register /> }
        </Route>


        <Route path="/messenger">
          {user ? <Redirect to="/" /> : <Messenger /> }
        </Route>
        <Route path="/library">
          {user ? <Redirect to="/" /> : <Library /> }
        </Route>
        <Route path="/users">
          {user ? <Redirect to="/" /> : <Users /> }
        </Route>

        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
