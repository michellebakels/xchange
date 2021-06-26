import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {columns} from "./columns";

const TransactionsTable = () => {

    const [tasks, setTasks] = useState([])
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch (`https://xchange-api-1909.web.app/tasks/status/completed`)
            .then((res) => res.json())
            .then((response) => setTasks(response.data))
            .catch(err => console.log('ERROR', err))
    },[])

    useEffect(() => {
        const builtData = []

        tasks.forEach(task => builtData.push(({
            key: task.id,
            id: task.id,
            title: task.title,
            requester: `${task.user.firstName} ${task.user.lastName}`,
            assignee: task.assignee.name,
            tokens: task.tokens
        })))

        setTableData(builtData)

    }, [tasks])

    return(
        <>
            <Table
                columns={columns}
                dataSource={tableData}
            />
        </>
    )
}

export default TransactionsTable