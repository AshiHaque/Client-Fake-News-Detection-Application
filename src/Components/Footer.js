import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <div style={{ paddingTop: "50px" }}>
    <footer id="footer" style={{ backgroundColor: "#238b76", flex: '0 0 50px', marginTop: 'auto' }}>
      <Navbar expand="md" variant="dark" className="justify-content-center">
        <Navbar.Brand 
          className="text-white font-weight-bold" 
          style={{ 
            borderBottom: '2px solid white', 
            paddingBottom: '3px' 
          }}
        >
          Fake News Detection Web Application
        </Navbar.Brand>
      </Navbar>
      <Container fluid="md" className="py-3" style={{ maxWidth: '800px' }}>
        <Row>
          <Col md={4}>
            <h5 className="text-white">About the project</h5>
            <p className="text-white">This web application is a FYP for Final year Computer Science (Artificial Intelligence)</p>
          </Col>
          <Col md={4}>
            <h5 className="text-white">Student Name</h5>
            <p className="text-white">Mir Ashiful Haque (1934196)</p>
          </Col>
          <Col md={4}>
            <h5 className="text-white">Contacts</h5>
            <p className="text-white">Github: <br/>ashi.haque<br/>Linkedin:<br/><a style={{ color: "white"}} href=" https://www.linkedin.com/in/mirashifulhaque/">mirashifulhaque</a><br/>Email: mirashifulhaque@gmail.com</p>
          </Col>
        </Row>
        <hr className="bg-white"/>
        <p className="text-center text-white d-none d-md-block">Copyright &copy;
          {new Date().getFullYear()} Fake News Detection Web Application
        </p>
      </Container>
    </footer>
    </div>
  );
}

export default Footer;