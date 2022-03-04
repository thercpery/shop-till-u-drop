import { useState, useEffect, useContext } from 'react';
import { Container, Table, Button, Row, Col, Form  } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import UserContext from "../UserContext";

const Cart = () => {
    const { user } = useContext(UserContext);
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState();
    const [isCartEmpty, setIsCartEmpty] = useState();
    
    const increment = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/api/users/cart/${id}/increment`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => data);
    };

    const decrement = (id) => {
        fetch(`http://localhost:5000/api/users/cart/${id}/decrement`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => data);
    };

    const removeCartItem = () => {

    };
    const checkoutFromCart = () => {};

    useEffect(() => {
        fetch(`http://localhost:5000/api/users/cart`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setIsCartEmpty((data.items.length === 0) ? true : false);
            setTotalAmount(data.total_amount);
            setCartItems(data.items.map(item => {
                return(
                    <tr key={item.product_id}>
                        <td><Link to={`/product/${item.product_id}`}>{item.product_name}</Link></td>
                        <td>&#8369; {item.product_price}</td>
                        <td>
                            <Row>
                                <Col>
                                    <Button onClick={(e) => decrement(item.product_id)}>-</Button>
                                </Col>
                                <Col>
                                    <Form.Control
                                        disabled
                                        type="number"
                                        value={item.product_quantity} />
                                </Col>
                                <Col>
                                    <Button onClick={(e) => increment(item.product_id)}>+</Button>
                                </Col>
                            </Row>
                        </td>
                        <td>&#8369; {item.product_price * item.product_quantity}</td>
                        <td><Button variant="danger" onClick={(e) => removeCartItem(item.product_id)}>Remove</Button></td>
                    </tr>
                )
            }));
        });
    }, [cartItems]);

  return (
    ((user.id !== null) && (localStorage.getItem("token") !== null))
    ?
        (!user.is_admin)
        ?
            <Container className="text-center mt-3">
                <h1>MY CART</h1>
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price Per Unit</th>
                            <th>Quantity</th>
                            <th>Sub Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems}
                        {
                        (isCartEmpty)
                        ?
                        <tr>
                            <td colSpan={5}>THERE ARE NO ITEMS IN YOUR CART</td>
                        </tr>
                        :
                            <tr>
                                <td colSpan={3}>TOTAL PRICE</td>
                                <td>&#8369; {totalAmount}</td>
                                 <td><Button variant="success" onClick={checkoutFromCart}>Checkout</Button></td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </Container>
        :
            <Redirect to="/dashboard" />
    :
        <Redirect to="/login" />
  )
}

export default Cart