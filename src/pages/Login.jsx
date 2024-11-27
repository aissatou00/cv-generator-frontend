import React, { useContext } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={Yup.object({
                email: Yup.string().email().max(20, 'Must be 20 characters or less').required('Required'),
                password: Yup.string().max(20, 'Must be 20 characters or less').required('Required')
            })}
            onSubmit={async (values) => {
                try {
                    const response = await fetch(
                        'http://node-project-u3nz.onrender.com/api/auth/login',
                        {
                            method: 'POST',
                            body: JSON.stringify(values),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const { user } = await response.json();
                    const { username, email, token } = user;
                    login({
                        user: {
                            username,
                            email
                        },
                        token
                    });
                    toast.success('Vous etes connectés !');
                    navigate('/welcome');
                } catch (error) {
                    console.error('Failed to register:', error);
                    toast.error('Echec de la connexion !');
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <Field className="form-control" type="email" name="email" />
                        <ErrorMessage style={{ color: 'red' }} name="email" component="div" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <Field className="form-control" type="password" name="password" />
                        <ErrorMessage style={{ color: 'red' }} name="password" component="div" />
                    </div>
                    <button className="btn btn-primary mt-3" type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default Login;
