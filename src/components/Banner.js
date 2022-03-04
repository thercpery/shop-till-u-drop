import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Banner = ({prop}) => {
    const {title, content, destination, label} = prop;
  return (
    <Row className="text-center">
        <Col className="p-5">
            <Container className="bg-light p-5">
                <h1>{title}</h1>
                <h4>{content}</h4>
                <Button as={Link} to={destination} className="btn-info">{label}</Button>
            </Container>
        </Col>
    </Row>
  )
}

export default Banner