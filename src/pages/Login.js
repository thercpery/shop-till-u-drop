import { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Card, Container, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

const Login = () => {
  const {user, setUser} = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  const loginUser = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => res.json())
    .then(data => {
      if(typeof data.accessToken !== "undefined"){
        localStorage.setItem("token", data.accessToken);
        retrieveUserDetails(data.accessToken);
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          text: "You can now shop online."
        });
        history.push("/shop");
      }
      else{
        Swal.fire({
          title: "Incorrect email/password",
          icon: "error",
          text: "Please enter your correct credentials."
        });
      }
    });
  };

  const retrieveUserDetails = (token) => {
    fetch("http://localhost:5000/api/users/details", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setUser({
        id: data.id,
        email: data.email,
        is_admin: data.is_admin
      });
    });
  };

  useEffect(() => {
    if(email !== "" && password !== "") setIsActive(true);
    else setIsActive(false);
  }, [email, password]);

  return (
    ((user.id !== null) || (localStorage.getItem("token") !== null))
    ?
    <Redirect to="/shop" />
    :
    <Container>
      <div className="d-flex justify-content-center mt-5">
        <Card className="text-center center-block cardForm">
          <Card.Header className="bg-success">
            <h3>LOGIN</h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={(e) => loginUser(e)}>
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
                    type="submit"
                    className="bg-success"
                  >
                    LOGIN
                  </Button>
                :
                  <Button
                    type="submit"
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