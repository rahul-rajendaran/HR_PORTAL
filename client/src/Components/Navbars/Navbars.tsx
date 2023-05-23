import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../Navbars/navbar.css";
const Navbars = () => {
  return (
    <>
      <Navbar className="navbar" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#" className="nav-brand">
            {" "}
            <h2>
              {" "}
              HR-PORTAL<span className="nav_brand_span">.</span>{" "}
            </h2>{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* <img
                    src="hrlogo.jpg"
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                  /> */}
                  <Nav.Link className="nav-link nav-underline" href="/">
                    <h4> Home</h4>
                    </Nav.Link>
                </div>
              </Nav>

              <Nav.Link className="nav-link nav-underline" href="/add">
                <h4> Add User</h4>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;
