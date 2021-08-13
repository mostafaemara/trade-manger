import Layout from "../components/layouts/layout";
import NavigationBar from "../components/layouts/NavigationBar";
import "../styles/globals.css";

import store from "../redux/store/index";
import { Provider } from "react-redux";
import AppWrapper from "../components/common/AppWrapper";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <body>
        <AppWrapper>
          <Layout>
            <NavigationBar></NavigationBar>
            <Component {...pageProps} />
          </Layout>
        </AppWrapper>
      </body>
    </Provider>
  );
}

export default MyApp;
