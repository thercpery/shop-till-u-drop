import { useState, useEffect } from 'react';
import { Card, Container, Form, Button } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if(email !== "" && password !== "") setIsActive(true);
    else setIsActive(false);
  }, [email, password]);

  return (
    <Container>
      <div className="d-flex justify-content-center mt-5">
        <Card className="text-center center-block cardForm">
          <Card.Header className="bg-success">
            <h3>LOGIN</h3>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId='userEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="user@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="hard to guess string"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {
                isActive
                ?
                  <Button
                    className="bg-success"
                  >
                    LOGIN
                  </Button>
                :
                  <Button
                    className="bg-danger"
                    disabled
                  >
                    LOGIN
                  </Button>
              }
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}

export default Login