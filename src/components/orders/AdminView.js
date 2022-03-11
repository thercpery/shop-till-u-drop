import { useState, useEffect } from 'react';
import { Table } from "react-bootstrap";

const AdminView = ({ orderData }) => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    setOrders(orderData.map(order => {
      let orderDate = new Date(order.created_at).toLocaleDateString();
      return(
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>
            {
              order.items.map(item => {
                return(
                  <ul>
                    <li key={item.id}>{item.product_name} - &#8369; {item.product_price} - {item.product_quantity} {(item.product_quantity > 1) ? "units" : "unit"} - &#8369; {item.product_subtotal}</li>
                  </ul>
                )
              })
            }
          </td>
          <td>&#8369; {order.total_amount}</td>
          <td>{order.user_email}</td>
          <td>{orderDate}</td>
        </tr>
      )
    }));
  }, [orderData, orders])

  return (
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Item - Price - Quantity - Subtotal</th>
          <th>Total Amount</th>
          <th>Purchased By:</th>
          <th>Purchased On:</th>
        </tr>
      </thead>
      <tbody>
        {orders}
      </tbody>
    </Table>
  )
}

export default AdminView