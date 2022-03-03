import {React} from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Row className="text-center">
        <Col className="p-5">
            <Container className="bg-light p-5">
                <h1>SHOP TILL U DROP</h1>
                <h4>No money? Why not take some credit?</h4>
                <Button className="mt-3" variant="info" as={Link} to="/shop">SHOP NOW</Button>
            </Container>
        </Col>
    </Row>
  )
}

export default Home