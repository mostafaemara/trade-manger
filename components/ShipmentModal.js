import React from "react";
import { Modal } from "react-bootstrap";
import ShipmentForm from "./forms/ShipmentForm";
import { selectModal } from "../redux/store/shipments-slice";
import { useSelector } from "react-redux";
function ShipmentModal() {
  const { show, shipment } = useSelector(selectModal);

  return (
    <Modal size='lg' show={show}>
      <Modal.Body>
        <ShipmentForm shipment={shipment}></ShipmentForm>
      </Modal.Body>
    </Modal>
  );
}

export default ShipmentModal;
