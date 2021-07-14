import React, { useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectError,
  hideErrorAlert,
  selectErrorAlertShow,
} from "../redux/store/shipments-slice";

function ErrorAlert() {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectError);
  const show = useSelector(selectErrorAlertShow);

  if (show) {
    setTimeout(() => {
      dispatch(hideErrorAlert());
    }, 5000);
  }

  return (
    <Alert variant='danger' show={show}>
      <Alert.Heading>Error occurred</Alert.Heading>
      <p> {errorMessage}</p>
    </Alert>
  );
}

export default ErrorAlert;
