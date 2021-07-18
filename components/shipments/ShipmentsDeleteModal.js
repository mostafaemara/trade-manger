import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  hideDeleteModal,
  selectDeleteModal,
  deleteShipmentThunk,
} from "../../redux/store/shipments-slice";
import { selectToken } from "../../redux/store/auth-slice";
function ShipmentsDeleteModal() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { show, id } = useSelector(selectDeleteModal);
  function handleClose() {
    dispatch(hideDeleteModal());
  }
  function handleDelete() {
    dispatch(
      deleteShipmentThunk({
        token: token,
        id: id,
      })
    );
  }
  return (
    <Modal dir='rtl' show={show}>
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

export default ShipmentsDeleteModal;
