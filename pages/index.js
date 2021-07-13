import PrivatePage from "../components/wrapper/protect-route";
import { fetchClientsThunk } from "../redux/store/clients-slice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function HomePage() {
  const dispatch = useDispatch();
  const status = useSelector(state => state.clients.status);


  const token = useSelector(state => state.auth.token);
  useEffect(() => {
    dispatch(fetchClientsThunk({
      token: token
    }));

  }, [fetchClientsThunk]);
  return (
    <PrivatePage>
      {status == "loading" ? <h1>Loading..</h1> :
        <div> <title>Home</title>
          <h1>Home Page</h1>


        </div>}</PrivatePage>

  );
}


export default HomePage;
