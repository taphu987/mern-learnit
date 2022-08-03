import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    return (
        <>
            <Form className="my-4">
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        required
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
