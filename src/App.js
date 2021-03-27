import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import 'antd/dist/antd.css';
import {Layout, Menu} from 'antd';
import Home from "./scenes/home";
import Users from "./scenes/users";
import UserProfile from "./scenes/userProfile";
import CreateProject from "./scenes/createProject";
import CreateUser from "./scenes/createUser";
import About from "./scenes/about";
import Transactions from "./scenes/transactions";
import CreateTransaction from "./scenes/createTransaction";

const { Header, Content, Footer } = Layout;

function App() {
  return (
      <Router>
        <Layout className="layout">
          <Header style={{background: 'white'}}>
            <Menu mode="horizontal">
                <Menu.Item key="1">
                  <Link to="/">
                    Home
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/users">
                    Users
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/transactions">
                    Transactions
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/about">
                    About
                  </Link>
                </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px', minHeight: '80vh' }}>
            <div>
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
          </Content>
          <Footer style={{ textAlign: 'center' }}>Created for 1909 Xchange</Footer>
        </Layout>
      </Router>
  );
}

export default App;
