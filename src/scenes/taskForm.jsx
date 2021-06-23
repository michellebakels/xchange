import React, {useState, useContext, useEffect} from 'react'
import {Button, Card, Col, Form, Row, message, Select} from "antd";
import {useHistory, useParams} from "react-router-dom";
import moment from 'moment';
import {UserContext} from "../App";
import {AntdTextArea, AntdInput, AntdSelect, AntdDatePicker} from "../components/antdMappedComponents/antdMapper";
import {points, skills, taskStatus, tools} from "../global/referenceData";

const { Option } = Select;

export const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}

const submitForm = (fields, userInfo, mode, taskId, history) => {
    const callEndpoint = mode === 'update' ? `https://xchange-api-1909.web.app/tasks/${taskId}` : 'https://xchange-api-1909.web.app/tasks'
    const callMethod = mode === 'update' ? 'PATCH' : 'POST'

    const formFields = {}
    fields && fields.forEach((field) => formFields[field.name[0]] = field.value)
    formFields.tokens = formFields.tokens && parseInt(formFields.tokens)
    formFields.neededBy = moment(formFields.neededBy).format('MM/DD/YYYY')
    if (mode !== 'update') formFields.status = 'Open'
    if (mode === 'update') formFields.assignee = JSON.parse(fields[fields?.length - 1]?.value)
    formFields.user = {
        userId: userInfo?.id,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        email: userInfo?.email
    }

    fetch(callEndpoint, {
        method: callMethod,
        body: JSON.stringify(formFields),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .then(json => {
            if (json.status === 'success') {
                message.success('Task saved successfully')
                return history.push('/')
            } else {
                message.error('Error saving task')
            }
        })
        .catch(err => console.log('ERROR', err))
}

const TaskForm = () => {
    const [form] = Form.useForm()
    const [fields, setFields] = useState()
    const [users, setUsers] = useState()
    const { mode, taskId } = useParams()
    const {userInfo} = useContext(UserContext)
    const history = useHistory()

    useEffect(() => {
        if (mode === 'update' && taskId) {
            fetch(`https://xchange-api-1909.web.app/tasks/id/${taskId}`)
                .then((res) => res.json())
                .then((response) => {
                    response.data.neededBy = moment(response?.data?.neededBy)
                    response.data.assignee = response?.data?.assignee?.name
                    return form.setFieldsValue(response.data)
                })
                .catch(err => console.log('ERROR', err))

            fetch(`https://xchange-api-1909.web.app/users`)
                .then((res) => res.json())
                .then((response) => setUsers(response))
                .catch(err => console.log('ERROR', err))
        }
    }, [])

    return(
        <>
            <Row justify="space-around">
                <Col span={24}>
                    <Form
                        name="createTask"
                        form={form}
                        fields={fields}
                        {...layout}
                        onFieldsChange={(changedFields, allFields) => setFields(allFields)}
                    >
                        <Card
                            title={`${mode === 'update' ? "Update" : "Create"} Task`}
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
                                    {mode === 'update' &&
                                        <>
                                            <AntdSelect
                                                name="status"
                                                label="Status"
                                                data={taskStatus}
                                            />
                                            <Form.Item
                                                name="assignee"
                                                label="Assignee"
                                            >
                                                <Select
                                                    allowClear
                                                >
                                                    {users && users.map((user) =>
                                                        <Option key={user.id}
                                                                value={JSON.stringify({id: user.id, name: `${user.firstName} ${user.lastName}`})}>
                                                            {`${user.firstName} ${user.lastName}`}
                                                        </Option>
                                                    )}
                                                </Select>
                                            </Form.Item>
                                        </>
                                    }
                                    <Button
                                        type="primary"
                                        onClick={() => submitForm(fields, userInfo, mode, taskId, history)}
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

export default TaskForm