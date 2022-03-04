import { useState, useEffect, Fragment, useContext } from 'react';
import { Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import ProductCards from "../components/ProductCards";
import UserContext from "../UserContext";   

const Shop = () => {
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/products/")
        .then(res => res.json())
        .then(data => {
            setProducts(data.map(product => {
                return (
                    <ProductCards 
                        key={product.id}
                        productProp={product}
                    />
                )
            }));
        });
    }, [products]);

  return (
      (user.is_admin)
      ?
        <Redirect to="/dashboard" />
      :
        <Container>
            <h1 className="text-center mt-3">SHOP</h1>
            <Fragment>
                {products}
            </Fragment>
        </Container>
  )
}

export default Shop