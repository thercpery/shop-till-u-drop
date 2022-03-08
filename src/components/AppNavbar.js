import { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import UserContext from '../UserContext';

const AppNavbar = () => {
  const {user} = useContext(UserContext);

  return (
    <Navbar expand="lg" variant="dark" className="bg-success">
      <Container>
        <Navbar.Brand as={Link} to="/">SHOP TILL U DROP</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/products">{ (user.is_admin) ? "Dashboard" : "Products" }</Nav.Link>
                  {
                    (user.id !== null && localStorage.getItem("token") !== null)
                    ?
                    <>
                      <Nav.Link as={NavLink} to="/orders">Orders</Nav.Link>
                      {
                        (!user.is_admin)
                        ?
                          <Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>
                        :
                        <></>
                      }
                    </>
                    :
                    <></>
                  }

          </Nav>
          <Nav>
            {
              (user.id !== null || localStorage.getItem("token") !== null)
              ?
              <NavDropdown title={user.email}>
                <NavDropdown.Item as={NavLink} to="/change-password">Change Password</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
              :
              <>
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar