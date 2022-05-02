import React from 'react'
import { Container, Navbar, Offcanvas, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import OperationsHeader from './OperationsHeader'

function Sidebar(props) {
  return (
    <Navbar bg="dark" variant="dark" expand={false}>
      <Container fluid>

        <Navbar.Toggle aria-controls="offcanvasNavbar" />


        <div className="searchBarNav">
          <OperationsHeader setSongAddedRefreshTemp={props.setSongAddedRefreshTemp} />
        </div>
        <Navbar.Brand href="#">Spotiwhy <img src="https://i.imgur.com/JqwEqTO.png" style={{ height: "30px" }} /> </Navbar.Brand>

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeVariant='white' closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Spotiwhy</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>

            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default Sidebar