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
    <Navbar
      dir='rtl'
      collapseOnSelect
      sticky='top'
      bg='dark'
      variant='dark'
      expand='md'>
      <Navbar.Brand className='mx-3'>
        <h4>شركة شرف الدين لتجارة الاقطان</h4>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='navbarScroll' />

      <Navbar.Collapse>
        <Container className='container-fluid'>
          {isAuthnticated && (
            <Nav>
              <Nav.Item>
                <Link href='/' passHref>
                  <Nav.Link>الرئيسية</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href='/shipments' passHref>
                  <Nav.Link>الشحنات</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href='/payments' passHref>
                  <Nav.Link>الدفعات المالية</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href='/clients' passHref>
                  <Nav.Link>العملاء</Nav.Link>
                </Link>
              </Nav.Item>{" "}
            </Nav>
          )}{" "}
          {isAuthnticated && (
            <Nav>
              <NavDropdown title={user.email}>
                <NavDropdown.Item onClick={logoutHandler}>
                  تسجيل خروج
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavigationBar;
