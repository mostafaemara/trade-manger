import React from "react";
import { Modal } from "react-bootstrap";
import ClientsForm from "./ClientsForm";
import { selectModal } from "../../redux/store/clients-slice";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../../redux/store/clients-slice";
function ClientsModal() {
  const dispatch = useDispatch();
  const { show, client } = useSelector(selectModal);
  function handleClose() {
    dispatch(hideModal());
  }

  return (
    <Modal centered onHide={handleClose} animation={true} size='lg' show={show}>
      <Modal.Body>
        <Modal.Header>
          <Modal.Title>{client ? "تعديل " : "اضافة"}</Modal.Title>
        </Modal.Header>
        <ClientsForm client={client}></ClientsForm>
      </Modal.Body>
    </Modal>
  );
}

export default ClientsModal;
