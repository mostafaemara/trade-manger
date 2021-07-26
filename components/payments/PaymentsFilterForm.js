import React from "react";
import { Form, Col, Button, InputGroup, FormControl } from "react-bootstrap";
import { Formik } from "formik";
import { selectClients } from "../../redux/store/clients-slice";
import {
  setClientFilter,
  setStartDateFilter,
  setEndDateFilter,
  toggleClientFilter,
  toggleStartDateFilter,
  toggleEndDateFilter,
} from "../../redux/store/payments-slice";
import { useSelector, useDispatch } from "react-redux";

function PaymentsFilterForm() {
  const clients = useSelector(selectClients);
  const dispatch = useDispatch();
  let itms = clients.map((client) => (
    <option key={client._id} value={client._id}>
      {client.name}
    </option>
  ));
  itms = [
    <option key={"0123456all"} value=''>
      All
    </option>,
    ...itms,
  ];
  function handleClientChange(event) {
    dispatch(setClientFilter(event.target.value));
  }
  function handleStartDateChange(event) {
    dispatch(setStartDateFilter(event.target.value));
  }
  function handleEndDateChange(event) {
    dispatch(setEndDateFilter(event.target.value));
  }
  function handleActiveClientChange(event) {
    console.warn("Togle Client Filter", event.target.checked);
    dispatch(toggleClientFilter(event.target.checked));
  }
  function handleActiveStartDateChange(event) {
    dispatch(toggleStartDateFilter(event.target.checked));
  }
  function handleActiveEndDateChange(event) {
    dispatch(toggleEndDateFilter(event.target.checked));
  }
  return (
    <Form noValidate>
      <Form.Row>
        <Col md='4'>
          <Form.Group>
            <Form.Label className='d-flex'>العميل</Form.Label>
            <InputGroup>
              <Form.Control
                as='select'
                type='select'
                onChange={handleClientChange}>
                {itms}
              </Form.Control>
              <InputGroup.Append onChange={handleActiveClientChange}>
                <InputGroup.Checkbox></InputGroup.Checkbox>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Col>{" "}
        <Col md='4'>
          <Form.Group>
            <Form.Label className='d-flex'>من تاريخ</Form.Label>
            <InputGroup>
              <Form.Control
                onChange={handleStartDateChange}
                type='date'></Form.Control>
              <InputGroup.Append onChange={handleActiveStartDateChange}>
                <InputGroup.Checkbox></InputGroup.Checkbox>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md='4'>
          <Form.Group>
            <Form.Label className='d-flex'>الي تاريخ</Form.Label>
            <InputGroup>
              <Form.Control
                onChange={handleEndDateChange}
                type='date'></Form.Control>
              <InputGroup.Append onChange={handleActiveEndDateChange}>
                <InputGroup.Checkbox></InputGroup.Checkbox>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Col>
      </Form.Row>
    </Form>
  );
}

export default PaymentsFilterForm;
