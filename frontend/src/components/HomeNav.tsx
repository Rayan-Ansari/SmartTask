import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function HomeNav() {
  return (
    <Navbar bg="light" expand="sm" className="mb-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Todo App</Navbar.Brand>
        <Nav>
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
          <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
