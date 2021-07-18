import { Button, Card } from "react-bootstrap";
import { showModal } from "../../redux/store/shipments-slice";
import { useDispatch } from "react-redux";
import ShipmentFilterForm from "./ShipmentFilterForm";

function ShipmentsBar() {
  const dispatch = useDispatch();

  const handleShow = () => {
    dispatch(showModal());
  };

  return (
    <Card dir='rtl'>
      <Card.Header>
        <Button className='d-flex' onClick={handleShow}>
          اضافة شحنة جديدة
        </Button>
      </Card.Header>
      <Card.Body>
        <ShipmentFilterForm></ShipmentFilterForm>
      </Card.Body>
    </Card>
  );
}

export default ShipmentsBar;
