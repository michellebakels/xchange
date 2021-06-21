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
import TaskForm from "./scenes/taskForm";
import UpdateUser from "./scenes/updateUser";
import About from "./scenes/about";
import Transactions from "./scenes/transactions";
import CreateTransaction from "./scenes/createTransaction";
import Project from "./components/projectDetails";
import AppHeader from "./components/appHeader";
import SignUp from "./components/appHeader/signUp";
import Login from "./components/appHeader/login";
import {useStickyState} from "./global/useStickyState";
import AppMenu from "./components/appMenu";
import AppLogo from "./components/appLogo";

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

    const currentYear = new Date().getFullYear()

  return (
      <Router>
          <AuthContext.Provider value={{ authUser, setAuthUser }}>
          <UserContext.Provider value={{ userInfo, setUserInfo }} >
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse.bind(undefined, collapsed)}>
                <div>
                    <AppLogo/>
                    <AppMenu/>
                </div>
            </Sider>
          <Layout>
              <AppHeader />
            <Content style={{ padding: '24px 50px'}}>
              <div>
                <Switch>
                  <Route exact path="/user-profile">
                      {authUser && <UserProfile />}
                  </Route>
                  <Route exact path="/users">
                      {authUser && <Users />}
                  </Route>
                  <Route exact path="/task-form">
                      {authUser && <TaskForm />}
                  </Route>
                  <Route exact path="/updateUser">
                      {authUser && <UpdateUser user={userInfo} />}
                  </Route>
                  <Route exact path="/transactions">
                      {authUser && <Transactions />}
                  </Route>
                  <Route exact path="/create-transaction">
                      {authUser && <CreateTransaction />}
                  </Route>
                  <Route exact path="/about">
                    <About />
                  </Route>
                  <Route exact path="/project/:taskId">
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
            <Footer style={{ textAlign: 'center' }}>Copyright © {currentYear}. All Rights Reserved</Footer>
          </Layout>
        </Layout>
        </UserContext.Provider>
        </AuthContext.Provider>
      </Router>
  );
}

export default App;
