import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <Navbar collapseOnSelect bg="success" variant="dark" expand="md">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold"
          style={{ letterSpacing: "2px" }}
        >
          Italifind
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <>
              <Nav.Link as={NavLink} end to="/">
                Hem
              </Nav.Link>
              <Nav.Link as={NavLink} end to="/map">
                Karta
              </Nav.Link>
              <Nav.Link as={NavLink} end to="/places">
                Matställen
              </Nav.Link>
              <Nav.Link as={NavLink} end to="/tips">
                Tips
              </Nav.Link>
              <Nav.Link as={NavLink} end to="/login">
                Logga in
              </Nav.Link>
              <Nav.Link as={NavLink} end to="/logout">
                Logga ut
              </Nav.Link>
            </>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
