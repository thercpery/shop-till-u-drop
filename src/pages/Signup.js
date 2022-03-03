import { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Container, Card, Form, Button } from "react-bootstrap";
import UserContext from "../UserContext";
import Swal from "sweetalert2";


const Signup = () => {
  const {user, setUser} = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isActive, setIsActive] = useState(false);

  const registerUser = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password1
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        Swal.fire({
          title: "Sign Up Successful",
          icon: "success",
          text: "You can now login and shop."
        });
        history.push("/login");
      }
      else{
        Swal.fire({
          title: "Sign Up Not Successful",
          icon: "error",
          text: "Please check your credentials."
        });
      }
    }); 
  };

  useEffect(() => {
    if((email !== "" && password1 !== "" && password2 !== "") && (password1 === password2)) setIsActive(true);
    else setIsActive(false);
  }, [email, password1, password2]);

  return (
    (user.id !== null)
    ?
    <Redirect to="/shop" />
    :
    <Container>
      <div className="d-flex justify-content-center mt-5">
        <Card className="text-center center-form cardForm">
          <Card.Header className="bg-success">
            <h3>SIGNUP</h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={(e) => registerUser(e)}>
              <Form.Group className="mb-3" controlId="userEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder="user@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="hard to guess string"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="hard to guess string"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              {
                isActive
                ?
                  <Button
                    type="submit"
                    className="bg-success"
                  >
                    SIGNUP
                  </Button>

                :
                  <Button
                    type="submit"
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