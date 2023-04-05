import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="bg-dark text-white mt-auto"
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Container fluid>
        <Row>
          <Col className="text-center bg-success py-3">
            <p>&copy; 2023 My Company</p>
            <Link
              to="https://github.com/jesperkling/hungry-app"
              target="_blank"
            >
              <img src="../src/assets/images/Github.svg" />
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
