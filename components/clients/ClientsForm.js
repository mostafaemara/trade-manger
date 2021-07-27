import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";

import {
  addNewClientThunk,
  hideModal,
  editeClientsThunk,
} from "../../redux/store/clients-slice";
import * as yup from "yup";

let clientSchema = yup.object().shape({
  name: yup.string().required("ادخل اسم"),

  phoneNumber: yup.string().required("ادخل رقم الهاتف"),
});

function ClientsForm({ client }) {
  let initialValue = {
    name: "",

    phoneNumber: "",
  };
  if (client) {
    initialValue = {
      name: client.name,
      phoneNumber: client.phoneNumber,
    };
  }

  function handleClose() {
    dispatch(hideModal());
  }
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    if (client) {
      dispatch(
        editeClientsThunk({
          client: { ...values, id: client._id },
          token: token,
        })
      );
    } else {
      dispatch(
        addNewClientThunk({
          client: values,
          token: token,
        })
      );
    }

    setSubmitting(false);
    resetForm({
      values: initialValue,
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValue}
      validationSchema={clientSchema}
      onSubmit={submitHandler}>
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col}>
              <Form.Label> الاسم</Form.Label>
              <Form.Control
                name='name'
                isInvalid={!!errors.name}
                value={values.name}
                onChange={handleChange}></Form.Control>
              <Form.Control.Feedback type='invalid' tooltip>
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>رقم الهاتف</Form.Label>
              <Form.Control
                isInvalid={!!errors.phoneNumber}
                name='phoneNumber'
                value={values.phoneNumber}
                onChange={handleChange}></Form.Control>
              <Form.Control.Feedback type='invalid' tooltip>
                {errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col}>
              <Button
                variant='warning'
                onClick={handleClose}
                type='button'
                className=' m-3'>
                الغاء
              </Button>
              <Button type='submit'>{client ? "تعديل" : "اضافة"}</Button>
            </Form.Group>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default ClientsForm;
