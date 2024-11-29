import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const CustomNavbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(!!user);

    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [user]);

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary w-100">
            <Container fluid={true}>
                <Navbar.Brand>
                    <Link to="/" className="nav-brand-link">CV Generator</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Home</Link>
                    </Nav>
                    <Nav>
                        {!isLoggedIn && (
                            <>
                                <Link to="/login" className="nav-link">Login</Link>
                                <Link to="/register" className="nav-link">Register</Link>
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="user-menu-dropdown">
                                    <NavDropdown.Item onClick={logout}>
                                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default CustomNavbar;
