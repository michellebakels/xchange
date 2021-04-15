import React, {useState} from 'react'
import {Button, Card, Col, Form, Row} from "antd";
import {AntdTextArea, AntdInput} from "../components/antdMappedComponents/antdMapper";

export const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}

const CreateProject = () => {
    const [form] = Form.useForm()
    const [fields, setFields] = useState();

    const submitForm = () => {

    }

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
                                <Col span={10}  style={{textAlign: 'right'}}>
                                    <AntdInput
                                        name="title"
                                        label="Title"
                                    />
                                    <AntdInput
                                        name="skillsNeeded"
                                        label="Skills Needed"
                                    />
                                    <AntdInput
                                        name="neededBy"
                                        label="Needed By"
                                    />
                                    <AntdInput
                                        name="tokens"
                                        label="Tokens"
                                    />
                                    <AntdTextArea
                                        name="description"
                                        label="Description"
                                    />
                                    <Button
                                        type="primary"
                                        onClick={() => submitForm(fields)}
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