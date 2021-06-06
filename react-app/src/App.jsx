import {Route, Switch, Redirect} from 'react-router-dom';

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Meet from "./pages/Meet";

function App() {
  return (
          <Switch>
              <Route path={"/404"} component={NotFound}/>
              <Route exact path={"/"} component={Home}/>
              <Route exact path={"/meet/*"} component={Meet}/>
              <Route exact path={"/*"}>
                  <Redirect to={"/404"}/>
              </Route>
          </Switch>
  );
}

export default App;
