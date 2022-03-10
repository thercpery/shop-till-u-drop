import { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import UserContext from "../UserContext";
import AdminView from "../components/orders/AdminView";
import UserView from "../components/orders/UserView";
import { Redirect } from 'react-router-dom';

const Orders = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = () => {
    fetch(`${ process.env.REACT_APP_API_URL }/api/orders/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => setOrders(data));
  };
  
  const fetchMyOrders = () => {
    fetch(`${ process.env.REACT_APP_API_URL }/api/orders/myorders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => setOrders(data));
  };

  useEffect(() => {
    if(user.is_admin) fetchAllOrders();
    else fetchMyOrders();
  }, [user]);

  return (
    ((user.id !== null) || (localStorage.getItem("token") !== null))
    ?
    <Container className="text-center mt-3">
      <h1>ORDERS</h1>
      {
        (user.is_admin)
        ?
        <AdminView orderData={orders} />
        :
        <UserView orderData={orders} />
      }
    </Container>
    :
    <Redirect to="/login" />
  )
}

export default Orders