import {Formik,Form,Field,ErrorMessage} from "formik";
import "bootstrap/dist/css/bootstrap.css";
import {useSelector,useDispatch} from "react-redux";

import { loginThunk,logout,selectAuthStatus, selectUser,selectIsAuthnticated} from "../redux/store/auth-slice";

function LoginForm(props){
    const validate=values=>{
        const errors={};
        if(!values.email){
            errors.email="Required";

        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
            errors.email="invalid Email Adress";
        }
        return errors
    };
    const submitHandler=(values,{setSubmitting})=>{
        dispatch(loginThunk(
           values
           // email:"sasa@masasa.com",
        //    password:"asdsdasdas"
          ));

 setSubmitting(false);
    };

    const isAuthnticated=useSelector(selectIsAuthnticated);
    const user=useSelector(selectUser);
    const authStatus=useSelector(selectAuthStatus);

    const dispatch=useDispatch();

    
    return <div class="w-100 d-flex justify-content-center"> 
    <div className="w-50 ">{authStatus==="failed"?<h1>Loading...</h1>:
        <Formik initialValues={{email:"",password:""}} validate={ validate} onSubmit={submitHandler}>

            {
                ({isSubmiting})=>(<Form>
                    <h1 className="font-weight-bold text-center p-3">Login</h1>
                    <div className="form-group p-3">
                        <label>Email</label>
                    <Field   className="form-control" type="email" name="email" ></Field>
                    <ErrorMessage  className="form-text text-danger" name="email" component="div"></ErrorMessage>
                    </div>
                    <div className="form-group p-3">
                    <label>Password</label>
                    <Field  className="form-control"  type="password" name="password" ></Field>
                    <ErrorMessage  className="form-text"  name="password" component="div"></ErrorMessage>
                    </div>
                    <button className="btn btn-primary m-3" type="submit" disabled={isSubmiting}>Submit</button >
                    <button type="button" class="btn btn-link">Dont have Acount? Signup</button>
                </Form>)

                
            }
        </Formik>
        }</div>
        </div>;
};
export default LoginForm;