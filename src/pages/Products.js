import { useState, useEffect, useContext } from 'react';
import { Container } from "react-bootstrap";
import UserContext from "../UserContext";
import AdminView from '../components/products/AdminView';
import UserView from '../components/products/UserView';

const Products = () => {
  
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const fetchAllProducts = () => {
    fetch(`${ process.env.REACT_APP_API_URL }/api/products/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => setProducts(data));
  }
  const fetchProductsInStock = () => {
    fetch(`${ process.env.REACT_APP_API_URL }/api/products`)
    .then(res => res.json())
    .then(data => setProducts(data));
  };

  useEffect(() => {
    if(user.is_admin) fetchAllProducts();
    else fetchProductsInStock();
  }, [user]);

  return (
    <Container className="mt-5 text-center">
      <h1>PRODUCTS</h1>
      {
        (user.is_admin)
        ?
        <AdminView productData={products} fetchAllProducts={fetchAllProducts} />
        :
        <UserView productData={products} />
      }
    </Container>
  )
}

export default Products