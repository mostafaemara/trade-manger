import { Button, Card } from "react-bootstrap";

import { useDispatch } from "react-redux";
import StatmentFilterForm from "./StatmentFilterForm";

function StatmentBar() {
  const dispatch = useDispatch();

  const handleShow = () => {
    dispatch(showModal());
  };

  return (
    <Card>
      <Card.Header></Card.Header>
      <Card.Body>
        <StatmentFilterForm></StatmentFilterForm>
      </Card.Body>
    </Card>
  );
}

export default StatmentBar;
