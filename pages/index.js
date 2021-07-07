import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/store/index";
import { loginThunk } from "../redux/store/auth-slice";

function HomePage() {



  return (
    <div>
      <h1>Home</h1>


    </div>
  );
}

export default HomePage;
