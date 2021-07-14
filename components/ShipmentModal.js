import React from "react";
import { Modal } from "react-bootstrap";
import ShipmentForm from "./forms/ShipmentForm";
import {
  selectShipmentModalShow,
  selectShipment,
} from "../redux/store/shipments-slice";
import { useSelector } from "react-redux";
function ShipmentModal() {
  const show = useSelector(selectShipmentModalShow);
  const shipment = useSelector(selectShipment);
  return (
    <Modal size='lg' show={show}>
      <Modal.Body>
        <ShipmentForm shipment={shipment}></ShipmentForm>
      </Modal.Body>
    </Modal>
  );
}

export default ShipmentModal;
