import React from "react";
import { Modal } from "react-bootstrap";
import ShipmentForm from "./ShipmentForm";
import { selectModal } from "../../redux/store/shipments-slice";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../../redux/store/shipments-slice";
function ShipmentModal() {
  const dispatch = useDispatch();
  const { show, shipment } = useSelector(selectModal);
  function handleClose() {
    dispatch(hideModal());
  }

  return (
    <Modal centered onHide={handleClose} animation={true} size='lg' show={show}>
      <Modal.Body>
        <Modal.Header>
          <Modal.Title>{shipment ? "تعديل شحنة" : "اضافة شحنة"}</Modal.Title>
        </Modal.Header>
        <ShipmentForm shipment={shipment}></ShipmentForm>
      </Modal.Body>
    </Modal>
  );
}

export default ShipmentModal;
