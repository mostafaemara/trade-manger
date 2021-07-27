import { Button, Card } from "react-bootstrap";
import { showModal } from "../../redux/store/clients-slice";
import { useDispatch } from "react-redux";

function ClientsBar() {
  const dispatch = useDispatch();

  const handleShow = () => {
    dispatch(showModal());
  };

  return (
    <Card>
      <Card.Header>
        <Button className='d-flex' onClick={handleShow}>
          اضافة عميل
        </Button>
      </Card.Header>
      <Card.Body></Card.Body>
    </Card>
  );
}

export default ClientsBar;
