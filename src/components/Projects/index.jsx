import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Input, Dropdown, Menu } from "antd";
import { DownOutlined, UserOutlined } from '@ant-design/icons';


import { Link } from "react-router-dom";
// import {data} from "../../data";
import './styles.css'
import { columns } from "./utils";


const Projects = () => {

    const [tasks, setTasks] = useState([])
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch(`https://xchange-api-1909.web.app/tasks`)
            .then((res) => res.json())
            .then((response) => setTasks(response.data))
            .catch(err => console.log('ERROR', err))
    }, [])

    useEffect(() => {
        const builtData = []

        tasks.forEach(task => builtData.push(({
            contact: (task.user && `${task.user.firstName} ${task.user.lastName}`),
            title: task.title
        })))

        setTableData(builtData)

        console.log('builtdata -->', builtData)
    }, [tasks])

    console.log(tasks)

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<UserOutlined />}>
                1st menu item
    </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                2nd menu item
    </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
                3rd menu item
    </Menu.Item>
        </Menu>
    );

    return (
        <div>
            <Input className="marketplace-filter" placeholder="Name" />
            <Dropdown overlay={menu}>
                <Button>
                    Task <DownOutlined />
                </Button>
            </Dropdown>
            <Dropdown overlay={menu}>
                <Button>
                    Skills <DownOutlined />
                </Button>
            </Dropdown>
            <div className="create-project-link">
                <Link to="/create-project">+ Create New Project</Link>
            </div>
            <Table
                columns={columns}
                dataSource={tableData}
            />
        </div>
    )
}

export default Projects