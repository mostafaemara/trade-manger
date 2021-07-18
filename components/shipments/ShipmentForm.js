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
function ShipmentForm({ shipment }) {
  let initialValue = {
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
  };
  if (shipment) {
    initialValue = {
      client: shipment.client._id,
      date: new Date(shipment.date).toLocaleDateString("en-US"),
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

  const submitHandler = (values, { setSubmitting }) => {
    console.log("handle Submit", values);
    if (shipment) {
      dispatch(
        editeShipmentThunk({
          shipment: values,
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
  };

  return (
    <div dir='rtl' className='card p-3'>
      <h3 className='card-title d-flex'>
        {shipment ? "تعديل شحنة" : "شحنة جديدة"}
      </h3>

      <div className='card-body'>
        <Formik
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
                    defaultChecked
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
                  <Button type='submit'>اضافة</Button>
                </Form.Group>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ShipmentForm;
