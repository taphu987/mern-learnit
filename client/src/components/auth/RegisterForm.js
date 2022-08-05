import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layouts/AlertMessage';

const RegisterForm = () => {
    const {
        registerUser,
        // authState: { isAuthenticated },
    } = useContext(AuthContext);

    // Local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [alert, setAlert] = useState(null);

    const { username, password, confirmPassword } = registerForm;

    const onChangeRegisterForm = (event) =>
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        });

    const register = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Passwords do not match' });
            setTimeout(() => setAlert(null), 3000);
            return;
        }

        try {
            const registerData = await registerUser(registerForm);

            if (!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message });
                setTimeout(() => setAlert(null), 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Form className="my-4" onSubmit={register}>
                <AlertMessage info={alert} />

                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        required
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>

                <Button className="mt-3" variant="success" type="submit">
                    Register
                </Button>
            </Form>
            <p>
                Already have an account?
                <Link to="/login">
                    <Button variant="info" size="sm" className="ml-4">
                        Login
                    </Button>
                </Link>
            </p>
        </>
    );
};

export default RegisterForm;
