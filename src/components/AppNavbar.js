import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const AppNavbar = () => {
  return (
    <Navbar expand="lg" variant="dark" className="bg-success">
      <Container>
        <Navbar.Brand as={Link} to="/">SHOP TILL U DROP</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/shop">Shop</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar