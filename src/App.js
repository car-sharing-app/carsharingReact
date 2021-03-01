import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import MainLoginPage from './logingPage/MainLoginPage';
import UserPanel from "./user/UserPanel.js"
import AdminPanel from "./admin/AdminPanel.js"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainLoginPage} />
        <Route exact path="/userPanel" component={UserPanel} />
        <Route exact path="/adminPanel" component={AdminPanel} />
      </Switch>
    </Router>
  );
}

export default App;

console.log("ok")