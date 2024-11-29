import React, { useContext } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext'; // Assurez-vous que le contexte AuthContext existe
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Assurez-vous d'avoir un contexte d'authentification

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string().required('Required')
            })}
            onSubmit={async (values) => {
                try {
                    const response = await fetch(
                        'http://node-project-u3nz.onrender.com/api/auth/login',
                        {
                            method: 'POST',
                            body: JSON.stringify(values),
                            headers: {
                                'Content-Type': 'application/json',
                                
                            },
                            credentials: 'include',
                        }
                    );

                    if (!response.ok) {
                        const errorData = await response.json();
                        toast.error(errorData.message || 'Echec de la connexion !');
                        return;
                    }

                    const { user, token } = await response.json();
                    login({ user, token }); // Sauvegarder l'utilisateur dans le contexte global
                    localStorage.setItem('token', token); // Sauvegarder le token dans le localStorage
                    toast.success('Vous êtes connecté !');
                    navigate('/dashboard');  // Rediriger vers le tableau de bord après connexion réussie
                } catch (error) {
                    console.error('Failed to login:', error);
                    toast.error('Echec de la connexion. Veuillez réessayer.');
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
                        Se connecter
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default Login;
