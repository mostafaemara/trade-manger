import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import {
  selectNewShipmentModalShow,
  showNewShipmentModal,
} from "../redux/store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import NewShipmentForm from "./forms/NewShipmentForm";
function ShipmentsBar() {
  const dispatch = useDispatch();

  const show = useSelector(selectNewShipmentModalShow);

  const handleShow = () => {
    dispatch(showNewShipmentModal());
  };

  return (
    <div>
      <Modal size='lg' show={show}>
        <Modal.Body>
          <NewShipmentForm></NewShipmentForm>
        </Modal.Body>
      </Modal>

      <div div className='card'>
        <div className='card-body'>
          <button
            type='button'
            onClick={handleShow}
            className='btn btn-primary'>
            Add New Shipment
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShipmentsBar;
