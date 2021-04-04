import React from 'react'
import {Card, Col, Row} from "antd";
import {data} from "../../data";
import './styles.css'

const Index = () => {

    const task = data[0]

    return (
        <div>
            <Row justify="space-around">
                <Col span={8}>
                    <Card
                        className="title-card"
                    >
                        <h2>{task.project}</h2>
                        <p><b>{task.contact}</b></p>
                        <p>Posted:&nbsp;{task.created}</p>
                        {task.skillsNeeded && (task.skillsNeeded).map(skill => {
                            return(
                                <span className="tag">{skill}</span>
                            )
                        })}
                    </Card>
                </Col>
                <Col span={14}>
                    <Card>
                        <p><b>Status:&nbsp;</b>{task.status}</p>
                        <p><b>Due&nbsp;Date:&nbsp;</b>{task.deadline}</p>
                        <br/>
                        <h3>Project Overview</h3>
                        <p>{task.description}</p>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Index