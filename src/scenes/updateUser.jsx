import React, {useContext, useState, useEffect} from 'react'
import {Button, Card, Col, Form, Row} from "antd";
import {AntdInput, AntdSelect, AntdTextArea} from "../components/antdMappedComponents/antdMapper";
import {UserContext} from "../App";
import {skills} from "../global/referenceData";

export const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}

const apiCallGetUser = (userId, setUserInfo) => {
    fetch(`https://xchange-api-1909.web.app/users/id/${userId}`)
        .then(response => response.json())
        .then(result => setUserInfo(result.data))
        .catch(err => console.log('ERROR', err))
}

const submitForm = (fields, userId, setUserInfo) => {
    const formFields = {}
    fields && fields.forEach((field) => formFields[field.name[0]] = field.value)
    console.log(JSON.stringify(formFields))

    fetch(`https://xchange-api-1909.web.app/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(formFields),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .then(result => apiCallGetUser(result.data.userId, setUserInfo))
        .catch(err => console.log('ERROR', err))
}

const UpdateUser = () => {

    const [fields, setFields] = useState()
    const {userInfo, setUserInfo} = useContext(UserContext)
    const [form] = Form.useForm()

    useEffect(() => {
        if (userInfo && (userInfo.id !== undefined)) {
            form.setFieldsValue(userInfo)
        }
    }, [userInfo])

    return(
        <>
            <Row justify="space-around">
                <Col span={24}>
                    <Form
                        name="createUser"
                        {...layout}
                        fields={fields}
                        onFieldsChange={(changedFields, allFields) => setFields(allFields)}
                        form={form}
                    >
                        <Card
                            title="Update User"
                        >
                            <Row justify="space-around">
                                <Col span={20}>
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
                                    <AntdSelect
                                        name="mySkills"
                                        label="My Skills"
                                        mode="multiple"
                                        data={skills}
                                    />
                                    <AntdInput
                                        name="website"
                                        label="Website"
                                    />
                                    <AntdInput
                                        name="calendlyLink"
                                        label="Calendly Link"
                                    />
                                    <AntdTextArea
                                        name="additionalInformation"
                                        label="Additional Info"
                                    />
                                    <Button
                                        type="primary"
                                        onClick={() => submitForm(fields, userInfo.id, setUserInfo)}
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

export default UpdateUser