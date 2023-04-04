import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">
          HungryApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <>
              <Nav.Link as={NavLink} end to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} end to="/map">
                Map
              </Nav.Link>
              <Nav.Link as={NavLink} end to="/restaurants">
                Restaurants
              </Nav.Link>
              <Nav.Link as={NavLink} end to="/tips">
                Tips
              </Nav.Link>
              <Nav.Link as={NavLink} end to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} end to="/logout">
                Logout
              </Nav.Link>
            </>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
