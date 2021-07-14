import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import {
  selectShipmentModalShow,
  showShipmentModal,
} from "../redux/store/shipments-slice";
import { useDispatch, useSelector } from "react-redux";
import ShipmentForm from "./forms/ShipmentForm";
function ShipmentsBar() {
  const dispatch = useDispatch();

  const handleShow = () => {
    dispatch(showShipmentModal());
  };

  return (
    <div>
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
