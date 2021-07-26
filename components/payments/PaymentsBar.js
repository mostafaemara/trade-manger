import { Button, Card } from "react-bootstrap";
import { showModal } from "../../redux/store/payments-slice";
import { useDispatch } from "react-redux";
import PaymentsFilterForm from "./PaymentsFilterForm";

function PaymentsBar() {
  const dispatch = useDispatch();

  const handleShow = () => {
    dispatch(showModal());
  };

  return (
    <Card>
      <Card.Header>
        <Button className='d-flex' onClick={handleShow}>
          اضافة دفعة مالية جديدة
        </Button>
      </Card.Header>
      <Card.Body>
        <PaymentsFilterForm></PaymentsFilterForm>
      </Card.Body>
    </Card>
  );
}

export default PaymentsBar;
