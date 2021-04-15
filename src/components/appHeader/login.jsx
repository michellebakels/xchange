import React, {useState, useContext} from 'react'
import { Card, Row, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import './styles.css'
import {handleLogin, resetPassword} from "./apiCalls";
import AntdInput, {AntdInputPassword} from "../antdMappedComponents/antdMapper";
import { UserContext } from "../../App";


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setErrors] = useState('')
    const history = useHistory();
    
    const { setUserInfo } = useContext(UserContext)

    return (
        <Row justify="space-around">
            <Card
                title="Login"
            >
                <form onSubmit={(e) => handleLogin(e, email, password, history, setErrors, setUserInfo)}>
                    <AntdInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        placeholder="Email"
                    />
                    <AntdInputPassword
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="passwordField"
                    />
                    <Button
                        className="resetButton"
                        onClick={() => resetPassword(email, setErrors)}
                    >
                        Reset Password
                    </Button>
                    <Row>
                        <Button
                            htmlType="submit"
                            size="large"
                            className="emailButton"
                        >
                            Log in
                        </Button>
                    </Row>
                    <Row justify="space-around">
                        {error &&
                        <div className="errorMessage">{error}</div>
                        }
                    </Row>
                </form>
            </Card>
        </Row>
    )
}

export default Login