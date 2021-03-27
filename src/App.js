import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Home from "./scenes/home";
import Users from "./scenes/users";
import UserProfile from "./scenes/userProfile";
import CreateProject from "./scenes/createProject";
import CreateUser from "./scenes/createUser";
import About from "./scenes/about";
import Transactions from "./scenes/transactions";
import CreateTransaction from "./scenes/createTransaction";

function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/transactions">Transactions</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/userProfile">
              <UserProfile />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/createProject">
              <CreateProject />
            </Route>
            <Route path="/createUser">
              <CreateUser />
            </Route>
            <Route path="/transactions">
              <Transactions />
            </Route>
            <Route path="/createTransaction">
              <CreateTransaction />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
