import React, { useRef, useState } from "react";
import { Alert, Button, Card, Container, Col, Form, Row } from "react-bootstrap";
import { useAuthContext } from "../contexts/Authentication"
import { useNavigate } from "react-router-dom"

function LoginPage() {
  const emailRef = useRef()
	const passwordRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { login } = useAuthContext()
	const navigate = useNavigate()

  const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null);

		try {
			setLoading(true)
			await login(emailRef.current.value, passwordRef.current.value)
			navigate('/')

		} catch (err) {
			setError(err.message)
			setLoading(false)
		}
	}

  return (
    <Container>
      <Row className="p-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Logga in</Card.Title>

              {error && (<Alert variant="danger">{error}</Alert>)}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>

                <Form.Group id="password">
                  <Form.Label>Lösenord</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <div className="p-2">
                  <Button disabled={loading} variant="danger" type="submit">
                    Logga in
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
