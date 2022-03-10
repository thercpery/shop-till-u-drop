import { useState, useEffect, useContext } from 'react';
import { Container, Button, Form, Card } from "react-bootstrap";
import { Link, useHistory, Redirect } from "react-router-dom";
import UserContext from "../UserContext";
import Swal from "sweetalert2";

const ChangePassword = () => {
    const {user} = useContext(UserContext);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [isActive, setIsActive] = useState(false);
    const history = useHistory();

    const changePassword = (e) => {
        e.preventDefault();
        console.log("PLAESA");
        fetch(`${ process.env.REACT_APP_API_URL }/api/users/changepassword`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                password: password1
            })
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire({
                title: "Password Successfully Changed!",
                icon: "success",
                text: "Please login again with your new password."
            });

            history.push("/logout");
        });
    };

    useEffect(() => {
        if((password1 !== "" && password2 !== "") && (password1 === password2)) setIsActive(true);
        else setIsActive(false);
    }, [password1, password2]);

  return (
      ((user.id !== null) || (localStorage.getItem("token") !== null))
      ?
    <Container className="mt-3 text-center">
        <div className="d-flex justify-content-center mt-5">
            <Card className="center-block">
                <Card.Header className="bg-success">
                    <h3>CHANGE PASSWORD</h3>    
                </Card.Header>    
                <Card.Body>
                    <Form onSubmit={(e) => changePassword(e)}>
                        <Form.Group className="mb-3" controlId="password1">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your New Password"
                                value={password1}
                                onChange={(e) => setPassword1(e.target.value)}
                                required
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password2">
                            <Form.Label>Confirm Your New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm your New Password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                required
                            ></Form.Control>
                        </Form.Group>
                        {
                            (isActive)
                            ?
                            <Button type="submit" className="btn-info">Change Password</Button>    
                            :
                            <Button type="submit" className="btn-danger" disabled>Change Password</Button>    
                        }
                    </Form>
                </Card.Body>    
            </Card>
        </div>
    </Container>
      :
      <Redirect to="/login" />
  )
}

export default ChangePassword