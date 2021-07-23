import React, { Fragment } from "react";

import WithAuth from "../../components/common/WithAuth";
function ClientsPage() {
  return (
    <Fragment>
      {" "}
      <div>
        <title>Clients</title>
        <h1>Clients Page</h1>
      </div>
    </Fragment>
  );
}

export default WithAuth(ClientsPage);
