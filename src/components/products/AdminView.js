import { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

const AdminView = (props) => {
    const {productData, fetchAllProducts} = props;
    const [products, setProducts] = useState();
    const [show, setShow] = useState(false);
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [mode, setMode] = useState();
    
    const handleClose = () => {
      if(mode === "update"){
        setId("");
        setName("");
        setDescription("");
        setPrice("");
      }
      setShow(false);
    };

    const handleShow = () => setShow(true);

    const sellProduct = (e) => {
      e.preventDefault();
      fetch(`${ process.env.REACT_APP_API_URL }/api/products/sell`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name: name,
          description: description,
          price: price
        })
      })
      .then(res => res.json())
      .then(data => {
        Swal.fire({
          title: "Item Saved!",
          icon: "success",
          text: "This item will appear in the shop."
        });
        handleClose();
        setMode("");
        setName("");
        setDescription("");
        setPrice("")
      });
    };

    const updateProduct = (e) => {
      e.preventDefault();
      fetch(`${ process.env.REACT_APP_API_URL }/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name: name, 
          description: description,
          price: price
        })
      })
      .then(res => res.json())
      .then(data => {
        Swal.fire({
          title: "Update Successful",
          icon: "success",
          text: "This item with updated values will appear in the shop."
        });
        handleClose();
        setId("");
        setMode("");
        setName("");
        setDescription("");
        setPrice("");
      });
    };

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
                onClick={() => {
                  setMode("update");
                  handleShow();
                  setId(product.id);
                  setName(product.name);
                  setDescription(product.description);
                  setPrice(product.price);
                }}
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
                onClick={() => {
                  setMode("update");
                  handleShow();
                  setId(product.id);
                  setName(product.name);
                  setDescription(product.description);
                  setPrice(product.price);
                }}
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
    }, [productData, fetchAllProducts]);
  return (
    <>
      <Button
        className="btn-success"
        onClick={(e) => {
          setMode("add")
          handleShow();
        }}
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
      <Modal show={show} onHide={handleClose} className="text-center">
        <Modal.Header closeButton>
          {
            (mode === "add")
            ?
              <Modal.Title>Sell New Product</Modal.Title>
              :
              <Modal.Title>Update Product</Modal.Title>
          }
        </Modal.Header>
        <Form onSubmit={(e) => {
          if(mode === "add") sellProduct(e);
          else {
            updateProduct(e);
          }
        }}>
          <Modal.Body>
            {
              (mode === "update")
              ?
              <Form.Control
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                hidden
              />
              :
              <></>
            }
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apple Macbook"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="This is a sturdy item."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="&#8369; 100,000.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>Close</Button>
            <Button type="submit" variant="success">
              {
                (mode === "add")
                ?
                "Sell Product"
                :
                "Update Product"
              }
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default AdminView