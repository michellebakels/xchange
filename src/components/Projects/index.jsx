import React, {useState, useEffect} from 'react'
import {Table, Tag} from "antd";
import {Link} from "react-router-dom";
import './styles.css'
import {columns} from "./utils";

const Projects = () => {

    const [tasks, setTasks] = useState([])
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch (`https://xchange-api-1909.web.app/tasks/`)
            .then((res) => res.json())
            .then((response) => setTasks(response.data))
            .catch(err => console.log('ERROR', err))
    },[])

    useEffect(() => {
        const builtData = []

        tasks.forEach(task => builtData.push(({
            id: task.id,
            contact: (task.user && `${task.user.firstName} ${task.user.lastName}`),
            title: task.title,
            skillsNeeded: task.skillsNeeded,
            deadline: task.neededBy,
            tokens: task.tokens
        })))

        setTableData(builtData)

    }, [tasks])

    return (
        <div>
            <div className="create-project-link">
                <Link to="/task-form">+ Create New Task</Link>
            </div>
            <Table
                columns={columns}
                dataSource={tableData}
            />
        </div>
    )
}

export default Projects