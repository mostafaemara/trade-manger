import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";

import { selectClients } from "../../redux/store/clients-slice";
import {
  addNewShipmentThunk,
  hideModal,
  editeShipmentThunk,
} from "../../redux/store/shipments-slice";
import * as yup from "yup";

let shipmentSchema = yup.object().shape({
  client: yup.string().required("اختار عميل"),
  date: yup.date("Invalid Date Format").required("اختار تاريخ"),
  weight: yup.number().required("ادخل الوزن"),
  pricePerKantar: yup.number().required("ادخل سعر القنطار"),
  expenses: yup.number().required("ادخل المصاريف"),
  gauge: yup.number().required("ادخل عيار الكيس"),
  bags: yup.number().required("ادخل عدد الاكياس"),
  extraGauge: yup.number().required("ادخل عيار الشكاره"),
  extraBags: yup.number().required("ادخل عدد الشكاير"),
  isPriced: yup.bool().required(),
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
function ShipmentForm({ shipment }) {
  let initialValue = {
    client: "",
    date: formatDate(new Date()),
    weight: "",
    pricePerKantar: "",
    expenses: "",
    gauge: 2,
    bags: "",
    extraGauge: 1,
    extraBags: "",
    isPriced: true,
  };
  if (shipment) {
    console.log("Shipmeeeeeeeeeeeent", shipment);
    initialValue = {
      client: shipment.client._id,
      date: formatDate(shipment.date),
      weight: shipment.weight,
      pricePerKantar: shipment.pricePerKantar,
      expenses: shipment.expenses,
      gauge: shipment.gauge,
      bags: shipment.bags,
      extraGauge: shipment.extraGauge,
      extraBags: shipment.extraBags,
      isPriced: shipment.isPriced,
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
    console.log("handle Submit", values);
    if (shipment) {
      dispatch(
        editeShipmentThunk({
          shipment: { ...values, id: shipment._id },
          token: token,
        })
      );
    } else {
      dispatch(
        addNewShipmentThunk({
          shipment: values,
          token: token,
        })
      );
    }

    setSubmitting(false);
    resetForm({
      values: {
        client: "",
        date: "",
        weight: "",
        pricePerKantar: "",
        expenses: "",
        gauge: 2,
        bags: "",
        extraGauge: 2,
        extraBags: "",
        isPriced: true,
      },
    });
    shipment = "";
  };

  return (
    <Formik
      onReset={(values) => {
        console.log("Hello", values);
      }}
      enableReinitialize={true}
      initialValues={initialValue}
      validationSchema={shipmentSchema}
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
        <Form dir='rtl' onSubmit={handleSubmit}>
          <Row className='mb-3'>
            {!shipment ? (
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
              <Form.Label>الوزن (ك.ج)</Form.Label>
              <Form.Control
                name='weight'
                type='number'
                isInvalid={!!errors.weight}
                value={values.weight}
                onChange={handleChange}></Form.Control>
              <Form.Control.Feedback type='invalid' tooltip>
                {errors.weight}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>سعر القنطار (ج.م)</Form.Label>
              <Form.Control
                isInvalid={!!errors.pricePerKantar}
                name='pricePerKantar'
                type='number'
                value={values.pricePerKantar}
                onChange={handleChange}></Form.Control>
              <Form.Control.Feedback type='invalid' tooltip>
                {errors.pricePerKantar}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>المصاريف (ج.م)</Form.Label>
              <Form.Control
                isInvalid={!!errors.expenses}
                name='expenses'
                type='number'
                value={values.expenses}
                onChange={handleChange}></Form.Control>{" "}
              <Form.Control.Feedback type='invalid' tooltip>
                {errors.expenses}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label> (ك.ج) عيار الكيس</Form.Label>
              <Form.Control
                type='number'
                name='gauge'
                value={values.gauge}
                onChange={handleChange}
                isInvalid={!!errors.gauge}></Form.Control>
              <Form.Control.Feedback type='invalid' tooltip>
                {errors.gauge}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>عدد الاكياس</Form.Label>
              <Form.Control
                onChange={handleChange}
                name='bags'
                value={values.bags}
                type='number'
                isInvalid={!!errors.bags}></Form.Control>
              <Form.Control.Feedback type='invalid' tooltip>
                {errors.bags}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>عيار الشكارة (ك.ج)</Form.Label>
              <Form.Control
                onChange={handleChange}
                name='extraGauge'
                value={values.extraGauge}
                type='number'
                isInvalid={!!errors.extraGauge}></Form.Control>
              <Form.Control.Feedback type='invalid' tooltip>
                {errors.extraGauge}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>عدد الشكاير</Form.Label>
              <Form.Control
                onChange={handleChange}
                name='extraBags'
                value={values.extraBags}
                type='number'
                isInvalid={!!errors.extraBags}></Form.Control>
              <Form.Control.Feedback type='invalid' tooltip>
                {errors.extraBags}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Check
                dir='rtl'
                defaultChecked={initialValue.isPriced}
                value={values.isPriced}
                name='isPriced'
                label='مسعر؟'
                onChange={handleChange}></Form.Check>
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
              <Button type='submit'>{shipment ? "تعديل" : "اضافة"}</Button>
            </Form.Group>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default ShipmentForm;
