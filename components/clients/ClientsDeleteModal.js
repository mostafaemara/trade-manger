import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  hideDeleteModal,
  selectDeleteModal,
  deleteClientThunk,
} from "../../redux/store/clients-slice";
import { selectToken } from "../../redux/store/auth-slice";
function ClientsDeleteModal() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { show, id } = useSelector(selectDeleteModal);
  function handleClose() {
    dispatch(hideDeleteModal());
  }
  function handleDelete() {
    console.log("handle delte", id);
    dispatch(
      deleteClientThunk({
        token: token,
        id: id,
      })
    );
  }
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>!حزف</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          هل انت متاكد انك تريد حذف العميل برجاء العلم انه سوف يتم حزف جميع
          البينات الخاصة بهذا العميل بما في ذلك الشحنات والدفعات ؟
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose} variant='secondary'>
          الغاء
        </Button>
        <Button onClick={handleDelete} variant='danger'>
          حزف
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ClientsDeleteModal;
