import './Navbar.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import logo from '../Images/Logo.png';

function HomePage() {
  return (
    <Navbar bg="light">
      <Nav className="mr-auto">
        <Nav.Link className="link-home" href="HomePage">
          Home
        </Nav.Link>
      </Nav>

      <Navbar.Brand className="mx-auto">
        <img
          src={logo}
          width="60"
          height="60"
          className="d-inline-block align-top"
          alt="Web Application Logo"
        />
      </Navbar.Brand>

       
    </Navbar>
  );
}

export default HomePage;