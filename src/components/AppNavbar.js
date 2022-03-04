import { useContext } from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
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
            {
              (user.id !== null && user.is_admin)
              ?
              <>
                <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={NavLink} to="/orders">Orders</Nav.Link>
              </>
              :
              <>
                  <Nav.Link as={NavLink} to="/shop">Shop</Nav.Link>
                  {
                    (user.id !== null && !user.is_admin)
                    ?
                    <>
                      <Nav.Link as={NavLink} to="/myorders">My Orders</Nav.Link>
                      <Nav.Link as={NavLink} to="/cart">My Cart</Nav.Link>
                    </>
                    :
                    <></>
                  }
              </>
            }
          </Nav>
          <Nav>
            {
              ((user.id !== null) || (localStorage.getItem("token") !== null))
              ?
              <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
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