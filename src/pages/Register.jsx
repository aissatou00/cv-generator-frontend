import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/register.css';

function Register() {
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{
                name: '', 
                email: '',
                password: '',
            }}
            validationSchema={Yup.object({
                name: Yup.string().required('Name is required'),
                email: Yup.string().email('Invalid email address').required('Email is required'),
                password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            })}
            onSubmit={async (values) => {
                try {
                    const payload = {
                        username: values.name, 
                        email: values.email,
                        password: values.password,
                    };

                    const response = await axios.post('http://127.0.0.1:5000/api/auth/register', payload, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.data) {
                        toast.success('Le compte a bien été créé !');
                        navigate('/login'); 
                    }
                } catch (error) {
                    console.error('Failed to register:', error);
                    toast.error(error.response?.data?.message || 'Une erreur s\'est produite. Veuillez réessayer.');
                }
            }}
        >
            <Form>
                <div className="flex justify-center items-center h-screen bg-gray-100">
                    <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <Field
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="border rounded-lg px-4 py-2 w-full"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="border rounded-lg px-4 py-2 w-full"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <Field
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="border rounded-lg px-4 py-2 w-full"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
                        >
                            Register
                        </button>

                        <p className="text-sm text-gray-600 mt-4 text-center">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-500">Login</a>
                        </p>
                    </div>
                </div>
            </Form>
        </Formik>
    );
}

export default Register;
