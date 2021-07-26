import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";

import { selectClients } from "../../redux/store/clients-slice";
import {
  addNewPaymentThunk,
  hideModal,
  editePaymentThunk,
} from "../../redux/store/payments-slice";
import * as yup from "yup";

let paymentSchema = yup.object().shape({
  client: yup.string().required("اختار عميل"),
  date: yup.date("Invalid Date Format").required("اختار تاريخ"),
  cash: yup.number().required("ادخل المبلغ"),
  recipient: yup.string().required("ادخل اسم المستلم"),
});

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
function PaymentsForm({ payment }) {
  let initialValue = {
    client: "",
    date: formatDate(new Date()),
    cash: 0,
    recipient: "",
  };
  if (payment) {
    initialValue = {
      client: payment.client._id,
      date: formatDate(payment.date),
      cash: payment.cash,
      recipient: payment.recipient,
    };
  }

  const clients = useSelector(selectClients);
  let itms = clients.map((client) => (
    <option key={client._id} value={client._id}>
      {client.name}
    </option>
  ));
  itms = [
    <option key={"0123456all"} value=''>
      اختار
    </option>,
    ...itms,
  ];
  function handleClose() {
    dispatch(hideModal());
  }
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const submitHandler = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    if (payment) {
      dispatch(
        editePaymentThunk({
          payment: { ...values, id: payment._id },
          token: token,
        })
      );
    } else {
      dispatch(
        addNewPaymentThunk({
          payment: values,
          token: token,
        })
      );
    }

    setSubmitting(false);
    resetForm({
      values: initialValue,
    });
    payment = "";
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValue}
      validationSchema={paymentSchema}
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
          <Row className='mb-3'>
            {!payment ? (
              <Form.Group as={Col}>
                <Form.Label>العميل</Form.Label>

                <Form.Control
                  as='select'
                  type='select'
                  name='client'
                  value={values.client}
                  isInvalid={!!errors.client}
                  onChange={handleChange}>
                  {itms}
                </Form.Control>
                <Form.Control.Feedback type='invalid' tooltip>
                  {errors.client}
                </Form.Control.Feedback>
              </Form.Group>
            ) : (
              <div></div>
            )}
            <Form.Group as={Col}>
              <Form.Label>التاريخ</Form.Label>
              <Form.Control
                onChange={handleChange}
                type='date'
                name='date'
                value={values.date}
                isInvalid={!!errors.date}></Form.Control>
              <Form.Control.Feedback type='invalid' tooltip>
                {errors.date}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label> (ج.م)المبلغ</Form.Label>
              <Form.Control
                name='cash'
                type='number'
                isInvalid={!!errors.weight}
                value={values.cash}
                onChange={handleChange}></Form.Control>
              <Form.Control.Feedback type='invalid' tooltip>
                {errors.cash}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>اسم من استلم المبلغ</Form.Label>
              <Form.Control
                isInvalid={!!errors.recipient}
                name='recipient'
                value={values.recipient}
                onChange={handleChange}></Form.Control>
              <Form.Control.Feedback type='invalid' tooltip>
                {errors.recipient}
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
              <Button type='submit'>{payment ? "تعديل" : "اضافة"}</Button>
            </Form.Group>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default PaymentsForm;
