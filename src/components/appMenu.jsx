import React, {useContext} from 'react'
import {Menu} from "antd";
import {CoffeeOutlined, HomeOutlined, SwapOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {UserContext} from "../App";

const AppMenu = () => {

    const {userInfo} = useContext(UserContext)

    return (
        <>
            <Menu mode="inline">
                <Menu.Item key="1" icon={<UserOutlined/>}>
                    <Link to="/user-profile">
                        {/* {userInfo.firstName} {userInfo.lastName} */}
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<HomeOutlined/>}>
                    <Link to="/">
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<SwapOutlined/>}>
                    <Link to="/transactions">
                        Transactions
                    </Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<CoffeeOutlined/>}>
                    <Link to="/about">
                        About
                    </Link>
                </Menu.Item>
            </Menu>
        </>
    )
}

export default AppMenu