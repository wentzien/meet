import React from "react";
import {Link, NavLink} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";


const NavBar = ({user}) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/meet/hallo">Meet</Nav.Link>
                        <Nav.Link as={NavLink} to="#Meetings">Meetings</Nav.Link>
                        <Nav.Link as={NavLink} to="#Chats">Chats</Nav.Link>
                    </Nav>
                    <Nav>
                        {!user && (
                            <React.Fragment>
                                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                            </React.Fragment>
                        )}
                        {user && (
                            <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
