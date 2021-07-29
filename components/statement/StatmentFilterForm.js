import React from "react";
import { Form, Col, Button, InputGroup, FormControl } from "react-bootstrap";
import { Formik } from "formik";
import { selectClients } from "../../redux/store/clients-slice";
import { setClientFilter } from "../../redux/store/statment-slice";
import { useSelector, useDispatch } from "react-redux";

function StatmentFilterForm() {
  const clients = useSelector(selectClients);
  const dispatch = useDispatch();
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
  function handleClientChange(event) {
    dispatch(setClientFilter(event.target.value));
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
            </InputGroup>
          </Form.Group>
        </Col>
      </Form.Row>
    </Form>
  );
}

export default StatmentFilterForm;
