import React, {useState, useContext} from 'react'
import {Button, Card, Col, Form, Row} from "antd";
import moment from 'moment';
import {AntdTextArea, AntdInput, AntdSelect, AntdDatePicker} from "../components/antdMappedComponents/antdMapper";
import {UserContext} from "../App";
import {points, skills, tools} from "../global/referenceData";

export const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}

const submitForm = (fields, userInfo) => {
    const formFields = {}
    fields && fields.forEach((field) => formFields[field.name[0]] = field.value)
    formFields.tokens = formFields.tokens && parseInt(formFields.tokens)
    formFields.neededBy = moment(formFields.neededBy).format('MM/DD/YYYY')
    formFields.status = 'Open'
    formFields.user = {
        userId: userInfo?.id,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        email: userInfo?.email
    }

    fetch('https://xchange-api-1909.web.app/tasks', {
        method: "POST",
        body: JSON.stringify(formFields),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .catch(err => console.log('ERROR', err))
}

const CreateProject = () => {
    const [form] = Form.useForm()
    const [fields, setFields] = useState();
    const {userInfo} = useContext(UserContext)

    return(
        <>
            <Row justify="space-around">
                <Col span={24}>
                    <Form
                        name="createProject"
                        form={form}
                        fields={fields}
                        {...layout}
                        onFieldsChange={(changedFields, allFields) => setFields(allFields)}
                    >
                        <Card
                            title="Create Project"
                        >
                            <Row justify="space-around">
                                <Col span={18}>
                                    <AntdInput
                                        name="title"
                                        label="Title"
                                    />
                                    <AntdSelect
                                        name="skillsNeeded"
                                        label="Skills Needed"
                                        mode="multiple"
                                        data={skills}
                                    />
                                    <AntdSelect
                                        name="toolsNeeded"
                                        label="Tools Needed"
                                        mode="multiple"
                                        data={tools}
                                    />
                                    <AntdDatePicker
                                        name="neededBy"
                                        label="Needed By"
                                        format={"MM/DD/YYYY"}
                                    />
                                    <AntdSelect
                                        name="tokens"
                                        label="Tokens"
                                        data={points}
                                    />
                                    <AntdTextArea
                                        name="description"
                                        label="Description"
                                    />
                                    <Button
                                        type="primary"
                                        onClick={() => submitForm(fields, userInfo)}
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

export default CreateProject