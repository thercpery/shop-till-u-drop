import React from 'react';
import { Container } from "react-bootstrap"

const Footer = () => {
    const year = new Date().getFullYear()
  return (
    <Container className="mt-3">
        <p className="text-center">Copyright &copy; { year } by Shop Till U Drop.</p>
    </Container>
  )
}

export default Footer