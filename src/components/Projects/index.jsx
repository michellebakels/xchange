import React, {useState, useEffect} from 'react'
import {Table, Tag} from "antd";
import {Link} from "react-router-dom";
// import {data} from "../../data";
import './styles.css'
import {columns} from "./utils";


const Projects = () => {

    const [tasks, setTasks] = useState([])
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch (`https://xchange-api-1909.web.app/tasks`)
            .then((res) => res.json())
            .then((response) => setTasks(response.data))
            .catch(err => console.log('ERROR', err))
    },[])

    useEffect(() => {
        
    }, [tasks])

    console.log(tasks)

    return (
        <div>
            <div className="create-project-link">
                <Link to="/create-project">+ Create New Project</Link>
            </div>
            <Table
                columns={columns}
                dataSource={tasks}
            />
        </div>
    )
}

export default Projects