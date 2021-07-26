import React from "react";
import { Modal } from "react-bootstrap";
import PaymentsForm from "./PaymentsForm";
import { selectModal } from "../../redux/store/payments-slice";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../../redux/store/payments-slice";
function PaymentsModal() {
  const dispatch = useDispatch();
  const { show, payment } = useSelector(selectModal);
  function handleClose() {
    dispatch(hideModal());
  }

  return (
    <Modal centered onHide={handleClose} animation={true} size='lg' show={show}>
      <Modal.Body>
        <Modal.Header>
          <Modal.Title>{payment ? "تعديل شحنة" : "اضافة شحنة"}</Modal.Title>
        </Modal.Header>
        <PaymentsForm payment={payment}></PaymentsForm>
      </Modal.Body>
    </Modal>
  );
}

export default PaymentsModal;
