import { Fragment } from "react";
import Sidebar from "./Sidebar";

function Layout(props) {
  return (
    <Fragment>
      <Sidebar></Sidebar>
      {props.children}
    </Fragment>
  );
}
export default Layout;
