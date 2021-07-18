import React, { useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert, selectAlert } from "../../redux/store/shipments-slice";

function ShipmentsStatusAlert() {
  const dispatch = useDispatch();

  const { show, content, title, type } = useSelector(selectAlert);

  if (show) {
    setTimeout(() => {
      dispatch(hideAlert());
    }, 5000);
  }

  return (
    <Alert
      dir='rtl'
      variant={type === "error" ? "danger" : "success"}
      show={show}>
      <Alert.Heading>{title}</Alert.Heading>
      <p> {content}</p>
    </Alert>
  );
}

export default ShipmentsStatusAlert;
