import LoginForm from "../../components/login/LoginForm";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectIsAuthnticated } from "../../redux/store/auth-slice";
function AuthPage() {
  const isAuthnticated = useSelector(selectIsAuthnticated);
  const router = useRouter();

  return (
    <div>
      <title>Login</title>

      <LoginForm className='form'></LoginForm>
    </div>
  );
}
export default AuthPage;
