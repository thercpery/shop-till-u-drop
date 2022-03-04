import React from 'react';
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCards = ({ productProp }) => {
    const {id, name, description, price} = productProp;
  return (
    <Card className="mb-2 text-center bg-light text-dark">
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle>Description</Card.Subtitle>
            <Card.Text>{description}</Card.Text>
            <Card.Subtitle>Price</Card.Subtitle>
            <Card.Text>&#8369; {price}</Card.Text>
            <Link className="btn btn-success" to={`/product/${id}`}>Details</Link>
        </Card.Body>
    </Card>
  )
}

export default ProductCards