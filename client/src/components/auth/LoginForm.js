import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const LoginForm = () => {
    // Context
    const { loginUser } = useContext(AuthContext);

    // Router
    const history = useHistory();

    // Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });

    const { username, password } = loginForm;

    const onChangeLoginForm = (event) =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

    const login = async (event) => {
        event.preventDefault();

        try {
            const loginData = await loginUser(loginForm);

            if (loginData.success) {
                history.push('/dashboard');
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form className="my-4" onSubmit={login}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>

                <Button className="mt-3" variant="success" type="submit">
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account?
                <Link to="/register">
                    <Button variant="info" size="sm" className="ml-4">
                        Register
                    </Button>
                </Link>
            </p>
        </>
    );
};

export default LoginForm;
