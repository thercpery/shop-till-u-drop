import { useState, useEffect } from 'react';
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserView = ({ orderData }) => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    setOrders(orderData.map(order => {
      let orderDate = new Date(order.created_at).toLocaleString();
      return(
        <tr>
          <td>{order.id}</td>
          <td>
            <ul>
              {
                order.items.map(product => {
                  return(
                    <li key={product.product_id}>
                      <Link to={`/product/${product.product_id}`}>{product.product_name}</Link> - &#8369; {product.product_price} - {product.product_quantity} {product.product_quantity > 1 ? "units" : "unit"} - &#8369; {product.product_subtotal}
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
  }, [orderData]);

  return (
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Item - Price - Quantity - Subtotal</th>
          <th>Total Amount</th>
          <th>Purchased On</th>
        </tr>  
      </thead>
      <tbody>
        {orders}
      </tbody>  
    </Table>
  )
}

export default UserView