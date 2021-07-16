import Layout from "../components/ui/layout";
import NavigationBar from "../components/ui/NavigationBar";
import "../styles/globals.css";

import store from "../redux/store/index";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <NavigationBar></NavigationBar>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
