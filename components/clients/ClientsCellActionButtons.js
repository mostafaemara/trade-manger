import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../..//redux/store/auth-slice";
import { showModal, ShowDeleteModal } from "../../redux/store/clients-slice";
function ClientsCellActionButtons({ client }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  function handleEdite() {
    dispatch(showModal(client));
  }
  function handleDelete() {
    dispatch(ShowDeleteModal(client._id));
  }
  return (
    <ButtonGroup siz='sm'>
      <Button
        onClick={handleEdite}
        className='m-2'
        variant='warning'
        disabled={!(user.authority >= 3)}>
        تعديل
      </Button>
      <Button
        onClick={handleDelete}
        className='m-2'
        variant='danger'
        disabled={!(user.authority >= 4)}>
        حزف
      </Button>
    </ButtonGroup>
  );
}

export default ClientsCellActionButtons;
