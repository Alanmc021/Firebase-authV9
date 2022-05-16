import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import styles from './styles.css'
import {  Link } from "react-router-dom";

export const Login = () => {
  const { signInGoogle, signed, signInWithEmailAndPasswordInFirebase } = useContext(AuthGoogleContext);

  async function handleLoginFromGoogle() {
    await signInGoogle();
  }

  async function handleLoginFromEmailAndPassword(email, password) {
    await signInWithEmailAndPasswordInFirebase(email, password);
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      email: Yup
        .string().email('Invalid email address').required('Required'),
    }),
    onSubmit: values => {
      handleLoginFromEmailAndPassword(values.email, values.email)
    },
  });

  if (!signed) {
    return (
      <>
        <form style={styles.socialForm} onSubmit={formik.handleSubmit}>
          <label htmlFor="password">password</label>
          <input
            id="password"
            name="password"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}

          <button type="submit">Submit</button>
        </form>
        <div>
          <button onClick={handleLoginFromGoogle}>Logar com o Google</button>
          <button onClick={handleLoginFromEmailAndPassword}>Logar com email e senha</button>
        </div>
        <div>
          {/* <button onClick={() => {<Link to="/ForgotPassword" /> }}>Esqueceu sua senha ?</button>
          <button onClick={() => { }}>Criar uma nova conta</button> */}
          <Link to="/ForgotPassword" ><h1>Esqueceu sua senha ?</h1></Link>
          <Link to="/CreateAccount" ><h1>Criar uma nova conta</h1></Link>
        </div>
      </>
    )
  } else {
    return <Navigate to="/Home" />;
  }

};