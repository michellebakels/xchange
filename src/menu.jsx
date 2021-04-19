import {Menu} from "antd";
import {CoffeeOutlined, HomeOutlined, SwapOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const AppMenu = () => {
    return (
        <Menu mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined/>}>
                <Link to="/">
                    Home
                </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<SwapOutlined/>}>
                <Link to="/transactions">
                    Transactions
                </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined/>}>
                <Link to="/users">
                    Users
                </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<CoffeeOutlined/>}>
                <Link to="/about">
                    About
                </Link>
            </Menu.Item>
        </Menu>
    )
}

export default AppMenu