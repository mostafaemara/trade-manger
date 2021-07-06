
import "bootstrap/dist/css/bootstrap.css";
import { Image, NavDropdown, Container, Button, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
function NavigationBar(props) {

    return <Navbar collapseOnSelect sticky="top" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand className="mx-3" ><h4>Trade Manger</h4>

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
            <Nav className="w-100 d-flex justify-content-end mx-3" >

                <Nav.Item> <Link href="/" passHref><Nav.Link>Home Page</Nav.Link></Link></Nav.Item>

                <Nav.Item>  <Link href="/shipments" passHref><Nav.Link>Shipments</Nav.Link></Link></Nav.Item>

                <Nav.Item>   <Link href="/payments" passHref><Nav.Link>Payments </Nav.Link></Link></Nav.Item>

                <Nav.Item>   <Link href="/clients" passHref><Nav.Link>Clients</Nav.Link></Link></Nav.Item>
                < NavDropdown className="mx-2" title={<img className="thumbnail-image"
                    src="user (2).png"
                    alt="user pic"
                />

                } >
                    <NavDropdown.Item>LogOut</NavDropdown.Item>

                </NavDropdown>



            </Nav>


        </Navbar.Collapse>


    </Navbar>
}
export default NavigationBar;