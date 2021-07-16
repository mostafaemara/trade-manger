import { Button, Row, Card, Form } from "react-bootstrap";
import { showModal } from "../redux/store/shipments-slice";
import { useDispatch } from "react-redux";
import ShipmentFilterForm from "./forms/ShipmentFilterForm";

function ShipmentsBar() {
  const dispatch = useDispatch();

  const handleShow = () => {
    dispatch(showModal());
  };

  return (
    <div>
      <Card>
        <Card.Header>
          <Button onClick={handleShow}>Add New Shipment</Button>
        </Card.Header>
        <Card.Body>
          <ShipmentFilterForm></ShipmentFilterForm>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ShipmentsBar;
