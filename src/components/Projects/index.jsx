import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Input, Dropdown, Menu, Select, message } from "antd";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { skills, tools } from '../../global/referenceData.js';
import { AntdSelect, AntdInput } from "../../components/antdMappedComponents/antdMapper";


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

    function handleButtonClick(e) {
        message.info('Click on left button.');
        console.log('click left button', e);
    }

    function handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <AntdSelect
                name="skillsNeeded"
                label="Skills Needed"
                mode="multiple"
                data={skills}
            />
        </Menu>
    );

    return (
        <div>
            <div>
            <div className="create-project-link">
                <AntdSelect
                    className="marketplace-filter"
                    name="nameNeeded"
                    label="Name Needed"
                    mode="multiple"
                />
                <AntdSelect
                    className="marketplace-filter"
                    name="skillsNeeded"
                    label="Skills Needed"
                    mode="multiple"
                    data={skills}
                />
                <AntdSelect
                    className="marketplace-filter"
                    name="toolsNeeded"
                    label="Tools Needed"
                    mode="multiple"
                    data={tools}
                />
                <Link to="/create-project">+ Create New Project</Link>
            </div>
            </div>
            <Table
                columns={columns}
                dataSource={tableData}
            />
        </div>
    )
}

export default Projects