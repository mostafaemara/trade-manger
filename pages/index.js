import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../store/index";


function HomePage() {

  function signInHandler() {
    dispatch(login());
  }
  function logoutHandler() {
    dispatch(logout());
  }


  const dispatch = useDispatch();
  const isAuthnticated = useSelector(state => state.auth.isAuthnticated);
  const user = useSelector(state => state.auth.user);
  return <div><h1>{user.username}</h1>
    {isAuthnticated ? <button onClick={logoutHandler}>SignOut</button> : <button onClick={signInHandler}>Signin</button>}
  </div>;
}

export default HomePage;