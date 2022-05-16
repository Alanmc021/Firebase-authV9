import { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './styles.css'

export const ForgotPassword = () => {
  const { recoveryPassword } = useContext(AuthGoogleContext);

  async function handlerecoveryPassword(values) {
    alert("Email enviado com sucesso")
    await recoveryPassword(values.email);
  }  

  const formik = useFormik({
    initialValues: {      
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup
        .string().email('Invalid email address').required('Required'),
    }),
    onSubmit: values => {
      handlerecoveryPassword(values)
    },
  });

  return (
    <div>
      <h1>Recuperar senha</h1>
      <form style={styles.socialForm} onSubmit={formik.handleSubmit}>       
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
    </div>
  );
};
