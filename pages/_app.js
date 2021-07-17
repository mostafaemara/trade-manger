import Layout from "../components/layouts/layout";
import NavigationBar from "../components/layouts/NavigationBar";
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
