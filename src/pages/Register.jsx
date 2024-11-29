// src/pages/Register.jsx
import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={Yup.object({
                username: Yup.string().max(10, 'Must be 10 characters or less').required('Required'),
                email: Yup.string().email('Invalid email address').max(50, 'Must be 50 characters or less').required('Required'),
                password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Required')
            })}
            onSubmit={async (values) => {
                try {
                    const response = await fetch(
                        'https://node-project-u3nz.onrender.com/api/auth/register',
                        {
                            method: 'POST',
                            body: JSON.stringify(values),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status} ${data.error}`);
                    }
                    toast.success('Le compte a bien été créé');
                    navigate('/login');
                } catch (error) {
                    console.error('Failed to register:', error);
                    toast.error('Failed to register');
                }
            }}
        >
            <Form>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="text-center mb-4">Register</h2>
                                    <div className="form-group mb-3">
                                        <label htmlFor="username">Username:</label>
                                        <Field className="form-control" type="text" name="username" autoComplete="username" />
                                        <ErrorMessage style={{ color: 'red' }} name="username" component="div" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email:</label>
                                        <Field className="form-control" type="email" name="email" autoComplete="email" />
                                        <ErrorMessage style={{ color: 'red' }} name="email" component="div" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Password:</label>
                                        <Field className="form-control" type="password" name="password" autoComplete="new-password" />
                                        <ErrorMessage style={{ color: 'red' }} name="password" component="div" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="confirmPassword">Confirm Password:</label>
                                        <Field className="form-control" type="password" name="confirmPassword" autoComplete="new-password" />
                                        <ErrorMessage style={{ color: 'red' }} name="confirmPassword" component="div" />
                                    </div>
                                    <button className="btn btn-primary btn-block" type="submit">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    );
}

export default Register;
