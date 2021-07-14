import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import ClientsSelect from "./ClientsSelect";
import {
  addNewShipmentThunk,
  hideShipmentModal,
  editeShipmentThunk,
} from "../../redux/store/shipments-slice";
import * as yup from "yup";

let shipmentSchema = yup.object().shape({
  client: yup.string().required("Please Select Client from The List"),
  date: yup.date("Invalid Date Format").required("Please Pick  Date"),
  weight: yup.number().required("Please add value"),
  pricePerKantar: yup.number().required("Please add value"),
  expenses: yup.number().required("Please add value"),
  gauge: yup.number().required("Please add value"),
  bags: yup.number().required("Please add value"),
  extraGauge: yup.number().required("Please add value"),
  extraBags: yup.number().required("Please add value"),
  isPriced: yup.bool().required(),
});
function ShipmentForm({ shipment }) {
  let initialValue = {};
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

  function handleClose() {
    dispatch(hideShipmentModal());
  }
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const submitHandler = (values, { setSubmitting }) => {
    if (shipment) {
      dispatch(
        editeShipmentThunk({
          shipment: values,
          token: token,
        })
      );
    } else {
      console.log("Shippppps", values);
      dispatch(
        addNewShipmentThunk({
          shipment: values,
          token: token,
        })
      );
    }
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className='card p-3'>
        <h3 className='card-title'>
          {shipment ? "Edite Shipment" : "New Shipment"}
        </h3>

        <div className='card-body'>
          <Formik
            enableReinitialize={true}
            initialValues={initialValue}
            validationSchema={shipmentSchema}
            onSubmit={submitHandler}>
            {({ isSubmiting }) => (
              <Form className='row g-4'>
                {!shipment ? (
                  <div className='col-md-6'>
                    <label>Client</label>
                    <ClientsSelect></ClientsSelect>
                    <ErrorMessage
                      className='form-text text-danger'
                      name='cleint'
                      component='div'></ErrorMessage>
                  </div>
                ) : (
                  <div></div>
                )}
                <div className='col-md-6'>
                  <label>Date</label>
                  <Field
                    className='form-control'
                    type='date'
                    name='date'></Field>
                  <ErrorMessage
                    className='form-text text-danger'
                    name='date'
                    component='div'></ErrorMessage>
                </div>
                <div className='col-md-4'>
                  <label>Weight (Kg)</label>
                  <Field
                    className='form-control'
                    type='number'
                    name='weight'></Field>
                  <ErrorMessage
                    className='form-text text-danger'
                    name='weight'
                    component='div'></ErrorMessage>
                </div>
                <div className='col-4'>
                  <label>Price Per Kantar (EGP)</label>
                  <Field
                    className='form-control'
                    type='number'
                    name='pricePerKantar'></Field>
                  <ErrorMessage
                    className='form-text text-danger'
                    name='pricePerKantar'
                    component='div'></ErrorMessage>
                </div>
                <div className='col-4'>
                  <label>Expenses (Kg)</label>
                  <Field
                    className='form-control'
                    type='number'
                    name='expenses'></Field>
                  <ErrorMessage
                    className='form-text text-danger'
                    name='expenses'
                    component='div'></ErrorMessage>
                </div>
                <div className='col-4'>
                  <label>Gauge (Kg)</label>
                  <Field
                    className='form-control'
                    type='number'
                    name='gauge'></Field>
                  <ErrorMessage
                    className='form-text text-danger'
                    name='gauge'
                    component='div'></ErrorMessage>
                </div>
                <div className='col-2'>
                  <label>Bags</label>
                  <Field
                    className='form-control'
                    type='number'
                    name='bags'></Field>
                  <ErrorMessage
                    className='form-text text-danger'
                    name='bags'
                    component='div'></ErrorMessage>
                </div>
                <div className='col-4'>
                  <label>Extra Gauge (Kg)</label>
                  <Field
                    className='form-control'
                    type='number'
                    name='extraGauge'></Field>
                  <ErrorMessage
                    className='form-text text-danger'
                    name='extraGauge'
                    component='div'></ErrorMessage>
                </div>
                <div className='col-2'>
                  <label>Extra Bags</label>
                  <Field
                    className='form-control'
                    type='number'
                    name='extraBags'></Field>
                  <ErrorMessage
                    className='form-text text-danger'
                    name='extraBags'
                    component='div'></ErrorMessage>
                </div>
                <div className='col-2 form-check'>
                  <label class='form-check-label' for='priced'>
                    Priced
                  </label>
                  <Field
                    id='priced'
                    className='form-check-input'
                    type='checkbox'
                    name='isPriced'></Field>

                  <ErrorMessage
                    className='form-text text-danger'
                    name='isPriced'
                    component='div'></ErrorMessage>
                </div>
                <div className='col-12'>
                  <button
                    onClick={handleClose}
                    type='button'
                    className='btn btn-warning m-3'>
                    Cancel
                  </button>
                  <button className='btn btn-primary m-3' type='submit'>
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ShipmentForm;
