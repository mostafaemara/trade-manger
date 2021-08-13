import { Formik, Form, Field, ErrorMessage } from "formik";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { Alert } from "react-bootstrap";
import {
  loginThunk,
  logout,
  selectAuthStatus,
  selectUser,
  selectError,
  selectIsAuthnticated,
} from "../../redux/store/auth-slice";

function LoginForm(props) {
  let loginSChema = yup.object().shape({
    email: yup.string().required("Required").email("Invalid Email"),
    password: yup.string().required("Required"),
  });

  const submitHandler = (values, { setSubmitting }) => {
    dispatch(
      loginThunk(
        values
        // email:"sasa@masasa.com",
        //    password:"asdsdasdas"
      )
    );

    setSubmitting(false);
  };

  const authStatus = useSelector(selectAuthStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  if (authStatus == "succeeded") {
  }

  return (
    <div className='bg'>
      <div className='d-flex justify-content-center p-5'>
        <div className='card '>
          <div className='card-header text-center'>
            {" "}
            <h3>دخول</h3>
          </div>
          <div className='card-body '>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={submitHandler}
              validationSchema={loginSChema}>
              {({ isSubmiting }) => (
                <Form>
                  <div className='form-group p-3'>
                    <label>البريد الالكتروني</label>
                    <Field
                      className='form-control'
                      placeholder='name@example.com'
                      type='email'
                      name='email'></Field>
                    <ErrorMessage
                      className='form-text text-danger'
                      name='email'
                      component='div'></ErrorMessage>
                  </div>
                  <div className='form-group p-3'>
                    <label>كلمة المرور</label>
                    <Field
                      className='form-control'
                      type='password'
                      name='password'></Field>
                    <ErrorMessage
                      className='form-text text-danger'
                      name='password'
                      component='div'></ErrorMessage>
                  </div>
                  <button
                    className='btn btn-primary m-3'
                    type='submit'
                    disabled={isSubmiting}>
                    دخول
                  </button>
                  <button type='button' className='btn btn-link'>
                    ليس لديك حساب؟ تسجيل دخول
                  </button>
                  {authStatus === "failed" && (
                    <Alert variant='danger'>{error.message}</Alert>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;
