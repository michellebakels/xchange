import React, {useEffect, useContext} from 'react'
import firebase from 'firebase'
import {Layout} from "antd";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../App";
import {logOut} from "./apiCalls";
import './styles.css'

const { Header } = Layout;

const AppHeader = () => {

    const { authUser, setAuthUser } = useContext(AuthContext)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(authenticatedUser => {
            authenticatedUser
                ? setAuthUser(authenticatedUser)
                : setAuthUser(null)
        })
    })

    return (
        <>
            <Header className="appWrapperHeader">
            <span style ={{float: "right"}}>
                {authUser
                    ? <React.Fragment>
                        <span className="headerItem">
                            <NavLink to="/" className="headerItem" onClick={(e) => logOut(e)}>
                                Log Out
                            </NavLink>
                        </span>
                    </React.Fragment>
                    : <React.Fragment>
                        <NavLink to="/login" className="headerItem">Log In</NavLink>
                        <NavLink to="/signup" className="headerItem">Sign Up</NavLink>
                    </React.Fragment>
                }
            </span>
            </Header>
        </>
    )
}

export default AppHeader