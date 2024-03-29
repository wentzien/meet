import React, {useState, useEffect} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Meet from "./pages/Meet";
import auth from "./services/authService";

import "normalize.css/normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [user, setUser] = useState();

    useEffect(() => {
        const currentUser = auth.getCurrentUser();
        setUser(currentUser);
        console.log(user);
    }, []);

  return (
      <React.Fragment>
          <ToastContainer/>
          <NavBar user={user}/>
          <main className="container">
              <Switch>
                  <Route path={"/login"} component={Login}/>
                  <Route path={"/logout"} component={Logout}/>
                  <Route path={"/register"} component={Register}/>
                  <Route path={"/404"} component={NotFound}/>
                  <Route exact path={"/"} component={Home}/>
                  <Route exact path={"/meet/*"} component={Meet}/>
                  <Route exact path={"/*"}>
                      <Redirect to={"/404"}/>
                  </Route>
              </Switch>
          </main>
      </React.Fragment>
  );
}

export default App;
