import React from 'react'
import {Button, Card, Col, Form, Row} from "antd";
import {AntdInput, AntdTextArea} from "../components/antdMappedComponents/antdMapper";
import {updateUser} from "../components/appHeader/apiCalls";

export const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}

const CreateUser = () => {
    return(
        <>
            <Row justify="space-around">
                <Col span={24}>
                    <Form
                        name="createUser"
                        {...layout}
                    >
                        <Card
                            title="Create User"
                        >
                            <Row justify="space-around">
                                <Col span={10}  style={{textAlign: 'right'}}>
                                    <AntdInput
                                        name="firstName"
                                        label="First Name"
                                    />
                                    <AntdInput
                                        name="lastName"
                                        label="Last Name"
                                    />
                                    <AntdInput
                                        name="company"
                                        label="Company"
                                    />
                                    <AntdInput
                                        name="email"
                                        label="Email"
                                    />
                                    <AntdInput
                                        name="mySkills"
                                        label="My Skills"
                                    />
                                    <AntdInput
                                        name="website"
                                        label="Website"
                                    />
                                    <AntdInput
                                        name="calendlyLink"
                                        label="Calendly Link"
                                    />
                                    <AntdInput
                                        name="additionalInformation"
                                        label="Additional Info"
                                    />
                                    <Button
                                        type="primary"
                                    >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default CreateUser