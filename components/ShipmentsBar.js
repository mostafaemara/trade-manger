import "bootstrap/dist/css/bootstrap.css";
import { showModal } from "../redux/store/shipments-slice";
import { useDispatch } from "react-redux";

function ShipmentsBar() {
  const dispatch = useDispatch();

  const handleShow = () => {
    dispatch(showModal());
  };

  return (
    <div>
      <div className='card'>
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
