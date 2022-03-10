import { useState, useEffect, Fragment, useContext } from 'react';
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { useParams, Link, useHistory, Redirect } from "react-router-dom";
import UserContext from "../UserContext";
import Swal from "sweetalert2";

const Product = () => {
  const { user } = useContext(UserContext);
  let [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isActive, setIsActive] = useState();
  const { id } = useParams();
  const history = useHistory();

  const increment = () => setQuantity(quantity+1);
  const decrement = () => {
    if(quantity > 1) setQuantity(quantity-1);
    else setQuantity(1);
  };

  const addToCart = () => {
    fetch(`${ process.env.REACT_APP_API_URL }/api/users/addtocart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        productId: id,
        quantity: quantity
      })
    })
    .then(res => res.json())
    .then(data => {
      Swal.fire({
        title: "Item added to cart!",
        icon: "success",
        text: "The item is added to your cart."
      })
    });
  };

  const buyNow = () => {
    fetch(`${ process.env.REACT_APP_API_URL }/api/orders/buynow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        productId: id,
        quantity: quantity
      })
    })
    .then(res => res.json())
    .then(data => {
      Swal.fire({
        title: "Order successful",
        icon: "success",
        text: "You can now see your order."
      });
      history.push("/orders");

    });
  };

  useEffect(() => {
    fetch(`${ process.env.REACT_APP_API_URL }/api/products/${id}`)
    .then(res => res.json())
    .then(data => {
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setIsActive(data.is_active);
    });
  }, [id]);

  return (
    (!user.is_admin)
    ?
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>  
            <Card.Body className="text-center">
              <Card.Title>
                <h1>{name}</h1>
              </Card.Title>
              <Card.Text>{description}</Card.Text>
              <Card.Subtitle>Quantity</Card.Subtitle>
              <Row className="mt-2 mb-2">
                  <Col>
                  {
                      (quantity > 1)
                      ?
                      <Button className="btn-block" onClick={decrement}>-</Button>
                      :
                      <Button className="btn-block" disabled={true}>-</Button>
                  }
                  </Col>
                  <Col>
                      <Form.Control 
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          disabled
                          />
                  </Col>
                  <Col>
                      <Button className="btn-block" onClick={increment}>+</Button>
                  </Col>
              </Row>
              <Card.Subtitle>Price:</Card.Subtitle>
              <Card.Text>&#8369; {price * quantity}</Card.Text>
              {
                  (isActive)
                  ?
                      ((user.id !== null) || (localStorage.getItem("token") !== null))
                      ?
                      <Fragment>
                          <Row>
                              <Col>
                                  <Button className="cartBtn" onClick={addToCart}>Add to Cart</Button>
                              </Col>
                              <Col>
                                  <Button className="cartBtn" onClick={buyNow}>Buy Now</Button>
                              </Col>
                          </Row>
                      </Fragment>
                      :
                      <Button variant="danger" as={Link} to="/login">Log In to Order</Button>
                  :
                      <Fragment>
                          <p>This item is out of stock.</p>
                      </Fragment>
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    :
    <Redirect to="/dashboard" />
  )
}

export default Product