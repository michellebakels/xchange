import React, {useState, createContext} from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import firebase from 'firebase/app'
import {firebaseConfig} from "./config";
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
import {HomeOutlined, SwapOutlined, UserOutlined, CoffeeOutlined} from '@ant-design/icons';
import Project from "./components/projectDetails";
import AppHeader from "./components/appHeader";
import SignUp from "./components/appHeader/signUp";
import Login from "./components/appHeader/login";
import {useStickyState} from "./global/useStickyState";

const { Content, Footer, Sider } = Layout;

firebase.initializeApp(firebaseConfig)

export const AuthContext = createContext(undefined)
export const UserContext = createContext(undefined)

function App() {

    const [collapsed, setCollapsed] = useState(false)
    const [authUser, setAuthUser] = useState(null)
    const [userInfo, setUserInfo] = useStickyState(null)

    const onCollapse = collapsed => {
        setCollapsed(!collapsed);
    };

  return (
      <Router>
          <AuthContext.Provider value={{ authUser, setAuthUser }}>
          <UserContext.Provider value={{ userInfo, setUserInfo }} >
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse.bind(undefined, collapsed)}>
                <div>
                    <div className="logo-container">
                        <div className="logo">
                            <img className="logo-img" src="https://weare1909.org/wp-content/uploads/2020/04/1909-logo@2x.png"/>
                        </div>
                    </div>
                <Menu mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                      <Link to="/">
                        Home
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<SwapOutlined />}>
                      <Link to="/transactions">
                        Transactions
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UserOutlined />}>
                        <Link to="/users">
                            Users
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<CoffeeOutlined />}>
                      <Link to="/about">
                        About
                      </Link>
                    </Menu.Item>
                </Menu>
                </div>
            </Sider>
          <Layout>
              <AppHeader />
            <Content style={{ padding: '24px 50px'}}>
              <div>
                <Switch>
                  <Route path="/user-profile">
                      {authUser && <UserProfile />}
                  </Route>
                  <Route path="/users">
                      {authUser && <Users />}
                  </Route>
                  <Route path="/create-project">
                      {authUser && <CreateProject />}
                  </Route>
                  <Route path="/createUser">
                      {authUser && <CreateUser />}
                  </Route>
                  <Route path="/transactions">
                      {authUser && <Transactions />}
                  </Route>
                  <Route path="/create-transaction">
                      {authUser && <CreateTransaction />}
                  </Route>
                  <Route path="/about">
                    <About />
                  </Route>
                  <Route path="/project">
                    <Project />
                  </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/signup">
                        <SignUp />
                    </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Copyright © 2021. All Rights Reserved</Footer>
          </Layout>
        </Layout>
        </UserContext.Provider>
        </AuthContext.Provider>
      </Router>
  );
}

export default App;
