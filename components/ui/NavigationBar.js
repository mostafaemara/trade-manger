import "bootstrap/dist/css/bootstrap.css";
import {
  Image,
  NavDropdown,
  Container,
  Button,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import {
  logout,
  selectUser,
  selectIsAuthnticated,
} from "../../redux/store/auth-slice";
import Link from "next/link";
function NavigationBar(props) {
  const isAuthnticated = useSelector(selectIsAuthnticated);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar collapseOnSelect sticky='top' bg='dark' variant='dark' expand='lg'>
      <Navbar.Brand className='mx-3'>
        <h4>Trade Manger</h4>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse>
        <Nav className='w-100 d-flex justify-content-end mx-3'>
          {isAuthnticated && (
            <Nav>
              <Nav.Item>
                <Link href='/' passHref>
                  <Nav.Link>Home</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href='/shipments' passHref>
                  <Nav.Link>Shipments</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href='/payments' passHref>
                  <Nav.Link>Payments </Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href='/clients' passHref>
                  <Nav.Link>Clients</Nav.Link>
                </Link>
              </Nav.Item>
              <NavDropdown title={user.email}>
                <NavDropdown.Item onClick={logoutHandler}>
                  LogOut
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavigationBar;
