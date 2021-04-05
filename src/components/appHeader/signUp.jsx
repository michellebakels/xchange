import React, {useState} from 'react'
import { Card, Row, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import './styles.css'
import {handleSignUp} from "./apiCalls";
import AntdInput, {AntdInputPassword} from "../antdMappedComponents/antdMapper";

const SignUp = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [error, setErrors] = useState('')
    const history = useHistory();

    return (
        <Row justify="space-around">
            <Card
                title="Sign Up"
            >
                <form onSubmit={(e) => handleSignUp(e, email, password, firstName, lastName, history, setErrors)}>
                <AntdInput
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        name="firstName"
                        type="firstName"
                        placeholder="First Name"
                    />
                    <AntdInput
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        name="lastName"
                        type="lastName"
                        placeholder="Last Name"
                    />
                    <AntdInput
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        placeholder="Email Address"
                    />
                    <AntdInputPassword
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <Row>
                        <Button
                            htmlType="submit"
                            size="large"
                            className="emailButton"
                        >
                            Sign Up
                        </Button>
                    </Row>
                    <Row>
                        {error &&
                        <div className="errorMessage">{error}</div>
                        }
                    </Row>
                </form>
            </Card>
        </Row>
    )
}

export default SignUp