import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const CVForm = () => {
  const [cv, setCv] = useState({});
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      // Si un id est fourni, on récupère le CV pour l'éditer
      const fetchCv = async () => {
        const response = await fetch(`/api/cvs/${id}`);
        const data = await response.json();
        setCv(data);
      };
      fetchCv();
    }
  }, [id]);

  const initialValues = {
    firstName: cv.firstName || '',
    lastName: cv.lastName || '',
    description: cv.description || '',
    // Ajoutez ici les autres champs
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Le prénom est requis'),
    lastName: Yup.string().required('Le nom est requis'),
    // Ajoutez ici les validations pour les autres champs
  });

  const handleSubmit = async (values) => {
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/cvs/${id}` : '/api/cvs';
    const response = await fetch(url, {
      method,
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      history.push('/dashboard');
    }
  };

  return (
    <div className="container">
      <h1>{id ? 'Modifier le CV' : 'Créer un CV'}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>Prénom</label>
            <Field name="firstName" />
          </div>
          <div>
            <label>Nom</label>
            <Field name="lastName" />
          </div>
          <div>
            <label>Description</label>
            <Field name="description" />
          </div>
          <button type="submit">{id ? 'Sauvegarder' : 'Créer'}</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CVForm;
