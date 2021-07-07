import Layout from "../components/ui/layout";
import NavigationBar from "../components/ui/NavigationBar";
import '../styles/globals.css'
import { Provider } from "react-redux";
import store from "../redux/store/index";
function MyApp({ Component, pageProps }) {
  return <Provider store={store}><Layout>
    <NavigationBar></NavigationBar>
    <Component {...pageProps} />
  </Layout></Provider >;

}

export default MyApp
