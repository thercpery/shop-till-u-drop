import { useState, useEffect, useContext } from 'react';
import { Container, Table } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import UserContext from "../UserContext";

const MyOrders = () => {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState();

    useEffect(() => {
        fetch(`http://localhost:5000/api/orders/myorders`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(!user.is_admin){
                setOrders(data.map(order => {
                    let orderDate = new Date(order.created_at).toLocaleDateString();
                    return(
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>
                                <ul>
                                    {
                                        order.items.map(product => {
                                            return(
                                                <li
                                                    key={product.id}
                                                >
                                                    <Link
                                                        to={`/product/${product.product_id}`}
                                                    >
                                                        {product.product_name}
                                                    </Link> - {product.product_quantity} {(product.product_quantity > 1) ? "units" : "unit"} - 
                                                    &#8369; {product.product_price} - &#8369; {product.product_subtotal}
                                                    </li>
                                            )
                                        })
                                    }
                                </ul>
                            </td>
                            <td>&#8369; {order.total_amount}</td>
                            <td>{orderDate}</td>
                        </tr>
                    )
                }));
            }
        });
    }, [orders, user]);

  return (
    ((user.id !== null) || (localStorage.getItem("token" !== null)))
    ?
        (!user.is_admin)
        ?
            <Container className="text-center mt-3">
                <h1>MY ORDERS</h1>
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Item(s) - Quantity - Price - Subtotal</th>
                            <th>Total Amount</th>
                            <th>Purchased On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders}
                    </tbody>
                </Table>
            </Container>
        :
            <Redirect to="/orders" />
    :
        <Redirect to="/login" />
  )
}

export default MyOrders