import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  hideDeleteModal,
  selectDeleteModal,
  deletePaymentThunk,
} from "../../redux/store/payments-slice";
import { selectToken } from "../../redux/store/auth-slice";
function PaymentsDeleteModal() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { show, id } = useSelector(selectDeleteModal);
  function handleClose() {
    dispatch(hideDeleteModal());
  }
  function handleDelete() {
    console.log("handle delte", id);
    dispatch(
      deletePaymentThunk({
        token: token,
        id: id,
      })
    );
  }
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>!حزف</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>هل انت متاكد انك تريد حزف هذه الشحنة؟</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose} variant='secondary'>
          الغاء
        </Button>
        <Button onClick={handleDelete} variant='danger'>
          حزف
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PaymentsDeleteModal;
