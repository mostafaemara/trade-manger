import React from "react";
import { Field } from "formik";
import { selectClients } from "../../redux/store/clients-slice";
import { useSelector } from "react-redux";

function ClientsSelect() {
  const clients = useSelector(selectClients);
  return (
    <Field as='select' className='form-select' name='client'>
      {clients.map((client) => (
        <option key={client._id} value={client._id}>
          {client.name}
        </option>
      ))}
    </Field>
  );
}

export default ClientsSelect;
