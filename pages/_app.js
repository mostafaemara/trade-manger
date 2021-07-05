import Layout from "../components/ui/layout";
import NavBar from "../components/ui/Navbar";
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return <Layout>
    <NavBar></NavBar>
    <Component {...pageProps} />
  </Layout>;

}

export default MyApp
