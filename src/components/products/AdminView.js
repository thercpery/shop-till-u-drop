import { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const AdminView = (props) => {
    const {productData, fetchAllProducts} = props;
    const [products, setProducts] = useState();

    const changeProductAvailability = (id) => {
      fetch(`${ process.env.REACT_APP_API_URL }/api/products/${id}/changeavailability`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => res.json())
      .then(data => {
        Swal.fire({
          title: "Changed Item Availability",
          icon: "success",
          text: "This item may or may not be shown in the shop."
        });
      });
    };

    useEffect(() => {
      const productArr = productData.map(product => {
        return(
          (product.is_active)
          ?
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>&#8369; {product.price}</td>
            <td>Yes</td>
            <td>
              <Button 
                className="btn-primary"
              >
                Update
              </Button>
              <Button
                className="btn-danger"
                onClick={(e) => changeProductAvailability(product.id)}
                >
                Archive
                </Button>
            </td>
          </tr>
          :
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>&#8369; {product.price}</td>
            <td>No</td>
            <td>
              <Button 
                className="btn-info"
              >
                Update
              </Button>
              <Button
                className="btn-success"
                onClick={(e) => changeProductAvailability(product.id)}
              >
                Resell
                </Button>
            </td>
          </tr>
        )
      });
      setProducts(productArr);
    }, [productData, fetchAllProducts, changeProductAvailability]);
  return (
    <>
      <Button
        className="btn-success"
      >
        Sell Product
      </Button>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>  
            <th>Name</th>  
            <th>Description</th>  
            <th>Price</th>  
            <th>Available?</th>  
            <th>Action</th>  
          </tr>  
        </thead>
        <tbody>
          {products}
        </tbody>  
      </Table>
    </>
  )
}

export default AdminView