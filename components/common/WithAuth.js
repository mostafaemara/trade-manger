import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuthnticated } from "../../redux/store/auth-slice";
import LoginForm from "../login/LoginForm";
const WithAuth = (Component) => {
  const Auth = (props) => {
    const isAuthnticated = useSelector(selectIsAuthnticated);
    if (isAuthnticated) {
      return <Component {...props} />;
    } else {
      return <LoginForm />;
    }
  };
  if (Component.getInialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }
  return Auth;
};

export default WithAuth;
