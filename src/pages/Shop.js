import { useState, useEffect, Fragment } from 'react';
import { Container } from "react-bootstrap";
import ProductCards from "../components/ProductCards";

const Shop = () => {
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
    }, []);

  return (
    <Container>
        <h1 className="text-center mt-3">SHOP</h1>
        <Fragment>
            {products}
        </Fragment>
    </Container>
  )
}

export default Shop