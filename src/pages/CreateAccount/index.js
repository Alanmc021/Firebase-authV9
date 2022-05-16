import { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './styles.css'

export const CreateAccount = () => {   
  const { createUserInFirebase } = useContext(AuthGoogleContext);

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
      //handleLoginFromEmailAndPassword(values.email, values.email)
    },
  });

  return (
    <div>
      <h1>Criar uma nova conta</h1>    
    </div>
  );
};
