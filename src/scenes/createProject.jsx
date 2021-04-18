import React, {useState, useContext} from 'react'
import {Button, Card, Col, Form, Row} from "antd";
import {AntdTextArea, AntdInput, AntdSelect} from "../components/antdMappedComponents/antdMapper";
import {UserContext} from "../App";
import {points, skills} from "../global/referenceData";

export const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}

const submitForm = (fields, userInfo) => {
    const formFields = {}
    fields && fields.forEach((field) => formFields[field.name[0]] = field.value)
    formFields.userId = userInfo.id

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
                                <Col span={18}  style={{textAlign: 'right'}}>
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
                                    <AntdInput
                                        name="neededBy"
                                        label="Needed By"
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