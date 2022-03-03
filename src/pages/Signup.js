import { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from "react-bootstrap";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if(email !== "" && password1 !== "" && password2 !== "") setIsActive(true);
    else setIsActive(false);
  }, [email, password1, password2]);

  return (
    <Container>
      <div className="d-flex justify-content-center mt-5">
        <Card className="text-center center-form cardForm">
          <Card.Header className="bg-success">
            <h3>SIGNUP</h3>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="userEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder="user@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="hard to guess string"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="hard to guess string"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {
                isActive
                ?
                  <Button
                    className="bg-success"
                  >
                    SIGNUP
                  </Button>

                :
                  <Button
                    className="bg-danger"
                    disabled
                  >
                    SIGNUP
                  </Button>

              }
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}

export default Signup;