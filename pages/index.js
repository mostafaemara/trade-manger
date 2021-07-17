import PrivatePage from "../components/common/protect-route";
import { fetchClientsThunk } from "../redux/store/clients-slice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectToken, selectIsAuthnticated } from "../redux/store/auth-slice";
function HomePage() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.clients.status);
  const isAuthnticated = useSelector(selectIsAuthnticated);
  const token = useSelector(selectToken);
  useEffect(() => {
    if (isAuthnticated) {
      dispatch(
        fetchClientsThunk({
          token: token,
        })
      );
    }
  }, [fetchClientsThunk]);
  return (
    <PrivatePage>
      {status == "loading" ? (
        <h1>Loading..</h1>
      ) : (
        <div>
          <title>Home</title>
          <h1>Home Page</h1>
        </div>
      )}
    </PrivatePage>
  );
}

export default HomePage;
