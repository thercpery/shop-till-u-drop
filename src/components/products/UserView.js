import { useState, useEffect } from 'react';
import ProductsCards from "../ProductCards";

const UserView = ({productData}) => {
    const [products, setProducts] = useState();

    useEffect(() => {
        setProducts(productData.map(product => {
            return (
                <ProductsCards
                    productProp={product}
                    key={product.id}
                />
            )
        }))
    }, [productData, products]);
    
  return (
      <>
        {products}
      </>
  )
}

export default UserView