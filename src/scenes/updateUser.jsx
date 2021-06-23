import React, { useContext, useState, useEffect } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { Button, Card, Col, Form, Row, Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { AntdInput, AntdSelect, AntdTextArea } from '../components/antdMappedComponents/antdMapper'
import { UserContext } from '../App'
import { skills, tools } from '../global/referenceData'
import moment from "moment";

export const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 },
}

const UpdateUser = () => {

	const history = useHistory()
	const [isValidImage, setIsValidImage] = useState(false)
	const [userImage, setUserImage] = useState(null)
	const [loading, setLoading] = useState(false)
	const [fields, setFields] = useState()
	const { userInfo, setUserInfo } = useContext(UserContext)
	const [form] = Form.useForm()
	const { userId } = useParams()

	useEffect(() => {
		if (userId) {
			fetch(`https://xchange-api-1909.web.app/users/id/${userId}`)
				.then((res) => res.json())
				.then((response) => {
					return form.setFieldsValue(response.data)
				})
				.catch(err => console.log('ERROR', err))
		}
	}, [])

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	)

	const getBase64 = (img, callback) => {
		if (isValidImage) {
			const reader = new FileReader()
			reader.addEventListener('load', () => callback(reader.result))
			reader.readAsDataURL(img)
		}
	}

	const beforeUpload = (file) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!')
		}
		const isLt2M = file.size / 1024 / 1024 < 2
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!')
		}
		setIsValidImage(isJpgOrPng && isLt2M)
		return isJpgOrPng && isLt2M
	}

	const handleChange = (info) => {
		getBase64(info.file.originFileObj, (image) => {
			setUserImage(image)
			// setUserInfo({ ...userInfo, userImage: image })
			setLoading(false)
		})
	}

	const apiCallGetUser = (userId, setUserInfo) => {
		fetch(`https://xchange-api-1909.web.app/users/id/${userId}`)
			.then((response) => response.json())
			.then((result) => {
				setUserInfo(result.data)
				history.push('/user-profile')
			})
			.catch((err) => console.log('ERROR', err))
	}

	const submitForm = (fields, userId, setUserInfo) => {
		const formFields = {}
		fields &&
			fields.forEach((field) => (formFields[field.name[0]] = field.value))
		formFields.userImage = userImage
		console.log(JSON.stringify(formFields))

		fetch(`https://xchange-api-1909.web.app/users/${userId}`, {
			method: 'PATCH',
			body: JSON.stringify(formFields),
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
		})
			.then((response) => response.json())
			.then((result) => apiCallGetUser(result.data.userId, setUserInfo))
			.catch((err) => console.log('ERROR', err))
	}

	return (
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
						<Card title="Update User">
							<Row justify="space-around">
								<Col span={20}>
									<Upload
										name="userImage"
										listType="picture-card"
										className="profile-uploader"
										showUploadList={false}
										beforeUpload={beforeUpload}
										onChange={handleChange}
									>
										{userImage ? (
											<img
												src={userImage}
												alt="Profile picture"
												style={{ width: '100%' }}
											/>
										) : (
											uploadButton
										)}
									</Upload>

									<AntdInput name="firstName" label="First Name" />
									<AntdInput name="lastName" label="Last Name" />
									<AntdInput name="company" label="Company" />
									<AntdInput name="email" label="Email" />
									<AntdSelect
										name="mySkills"
										label="My Skills"
										mode="multiple"
										data={skills}
									/>
									<AntdSelect
										name="myTools"
										label="My Tools"
										mode="multiple"
										data={tools}
									/>
									<AntdInput name="website" label="Website" />
									<AntdInput name="calendlyLink" label="Calendly Link" />
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
