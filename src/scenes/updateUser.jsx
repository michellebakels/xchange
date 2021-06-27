import React, { useContext, useState, useEffect } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { Button, Card, Col, Form, Row } from 'antd'
import { CloseOutlined } from '@ant-design/icons';
import {useDropzone} from 'react-dropzone'
import { AntdInput, AntdSelect, AntdTextArea } from '../components/antdMappedComponents/antdMapper'
import { UserContext } from '../App'
import { skills, tools } from '../global/referenceData'

export const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 },
}

const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
    justifyContent: 'space-around',
	marginTop: 16,
};

const thumb = {
	display: 'inline-flex',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	marginBottom: 8,
	marginRight: 8,
	width: 100,
	height: 100,
	padding: 4,
	boxSizing: 'border-box'
};

const thumbInner = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden'
};

const img = {
	display: 'block',
	width: 'auto',
	height: '100%'
};

const deleteImage = {
	backgroundColor: 'red',
	color: 'white',
	marginRight: -16,
	marginTop: -8,
	verticalAlign: 'top'
}

const UpdateUser = () => {

	const history = useHistory()
	const [userImage, setUserImage] = useState(undefined)
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

	useEffect(() => () => {
		// Make sure to revoke the data uris to avoid memory leaks
		URL.revokeObjectURL(userImage?.preview);
	}, [userImage]);

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
		fields && fields.forEach((field) => (formFields[field.name[0]] = field.value))
		formFields.userImage = userImage[0].preview
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

	const {getRootProps, getInputProps} = useDropzone({
		accept: 'image/*',
		onDrop: acceptedFiles => {
			setUserImage(acceptedFiles.map(file => Object.assign(file, {
				preview: URL.createObjectURL(file)
			})));
		}, multiple: false
	});

	const thumbs = userImage && userImage.map(file => (
		<div key={file.preview}>
			<Button
				shape="circle"
				onClick={() => setUserImage(undefined)}
				icon={<CloseOutlined />}
				style={deleteImage}
			/>
			<div style={thumb} key={file.name}>
				<div style={thumbInner}>
					<img
						src={file.preview}
						style={img}
					/>
				</div>
			</div>
		</div>
	));

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
									<Row justify="space-around">
										<div className="dropzone-container">
											{!userImage &&
											<div {...getRootProps({className: 'dropzone'})}>
												<input {...getInputProps()} />
												<p>Drag 'n' drop an image here, or click to select an image</p>
											</div>}
											<aside style={thumbsContainer}>
												{thumbs}
											</aside>
										</div>
									</Row>

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
