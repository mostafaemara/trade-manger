import React from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/store/auth-slice";
import { showShipmentModal } from "../redux/store/shipments-slice";
function CellActionButtons({ shipment }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  function handleEdite() {
    dispatch(showShipmentModal(shipment));
  }
  return (
    <div>
      <ButtonToolbar>
        <Button
          onClick={handleEdite}
          className='m-2'
          variant='warning'
          disabled={!(user.authority >= 3)}>
          Edite
        </Button>
        <Button
          className='m-2'
          variant='danger'
          disabled={!(user.authority >= 4)}>
          Delete
        </Button>
      </ButtonToolbar>
    </div>
  );
}

export default CellActionButtons;
