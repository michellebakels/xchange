import React, {useContext, useEffect, useState} from 'react'
import {Button, Card, Col, Row} from "antd";
import './styles.css'
import {useHistory, useParams} from "react-router-dom";
import {UserContext} from "../../App";

const Project = () => {

    const { taskId } = useParams()
    const [task, setTask] = useState(undefined)
    const { userInfo } = useContext(UserContext)
    const history = useHistory()

    useEffect(() => {
        fetch (`https://xchange-api-1909.web.app/tasks/id/${taskId}`)
            .then((res) => res.json())
            .then((response) => setTask(response.data))
            .catch(err => console.log('ERROR', err))
    }, [taskId])

    return (
        <div>
            <Row justify="space-around">
                <Col span={8}>
                    <Card
                        className="title-card"
                    >
                        <h2>{task?.title}</h2>
                        <p><b>{`${task?.user?.firstName} ${task?.user?.lastName}`}</b></p>
                        {/*<p>Posted:&nbsp;{task?.created}</p>*/}
                        <div>
                        {task?.skillsNeeded && (task?.skillsNeeded).map(skill => {
                            return(
                                <div className="skill-tag" key={skill}>{skill}</div>
                            )
                        })}
                        </div>
                        <div>
                            {task?.toolsNeeded && (task?.toolsNeeded).map(tool => {
                                return(
                                    <div className="tool-tag" key={tool}>{tool}</div>
                                )
                            })}
                        </div>
                        {(userInfo?.id === task?.user?.userId) &&
                            task.status !== 'Done' &&
                            <>
                                <br/>
                                <div style={{textAlign: "center"}}>
                                    <Button
                                        className="button"
                                        onClick={() => history.push(`/task-form/update/${taskId}`)}
                                    >
                                        Update Task
                                    </Button>
                                </div>
                            </>
                        }
                    </Card>
                </Col>
                <Col span={14}>
                    <Card>
                        <p><b>Status:&nbsp;</b>{task?.status}</p>
                        {task?.status !== 'Open' && <p><b>Assignee:&nbsp;</b>{task?.assignee?.name}</p>}
                        <p><b>Due&nbsp;Date:&nbsp;</b>{task?.neededBy}</p>
                        <br/>
                        <h3>Project Overview</h3>
                        <p>{task?.description}</p>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Project