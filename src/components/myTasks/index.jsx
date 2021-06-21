import React, {useState, useEffect, useContext} from 'react'
import {Table, Tag} from "antd";
import {Link} from "react-router-dom";
import '../Projects/styles.css'
import {columns} from "./columns";
import {UserContext} from "../../App";


const MyTasks = () => {

    const [tasks, setTasks] = useState([])
    const [tableData, setTableData] = useState([])
    const { userInfo } = useContext(UserContext)

    useEffect(() => {
        fetch (`https://xchange-api-1909.web.app/tasks/${userInfo.id}`)
            .then((res) => res.json())
            .then((response) => setTasks(response.data))
            .catch(err => console.log('ERROR', err))
    },[])

    useEffect(() => {
        const builtData = []

        tasks.forEach(task => builtData.push(({
            id: task.id,
            title: task.title,
            skillsNeeded: task.skillsNeeded,
            deadline: task.neededBy,
            tokens: task.tokens
        })))

        setTableData(builtData)

    }, [tasks])

    console.log(tasks)

    return (
        <div>
            <div className="create-project-link">
                <Link to="/create-project">+ Create New Task</Link>
            </div>
            <Table
                columns={columns}
                dataSource={tableData}
            />
        </div>
    )
}

export default MyTasks