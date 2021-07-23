import React from "react";
import WithAuth from "../../components/common/WithAuth";

function PaymentsPage() {
  return (
    <>
      {" "}
      <div>
        <title>Payments</title>
        <h1>Payments Page</h1>
      </div>
    </>
  );
}
WithAuth;
export default WithAuth(PaymentsPage);
