import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  hideDeleteModal,
  selectDeleteModal,
  deleteShipmentThunk,
} from "../redux/store/shipments-slice";
import { selectToken } from "../redux/store/auth-slice";
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
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Delete!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete this item?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose} variant='secondary'>
          Cancel
        </Button>
        <Button onClick={handleDelete} variant='danger'>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ShipmentsDeleteModal;
