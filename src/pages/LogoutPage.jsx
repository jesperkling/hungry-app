import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useAuthContext } from "../contexts/Authentication";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
  const { currentUser, logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      if (currentUser) {
        console.log("currentUser logged in", currentUser);
        await logout();
        navigate("/logout");
      }
    };
    handleLogout();
    console.log("currentUser logged out", currentUser);
  }, [currentUser, logout, history]);

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Logga ut</Card.Title>
              <p>Du är nu utloggad.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LogoutPage;
