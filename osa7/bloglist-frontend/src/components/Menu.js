import React from "react"
import { Link } from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap"

const Menu = (props) => {
  const padding = {
    padding: 5
  }
  return (
    <div>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">Bloglist</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                <Link style={padding} id="RouterNavLink" className="navFont" to="/">
                  Blogs
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link style={padding} id="RouterNavLink" className="navFont" to="/users">
                  Users
                </Link>
              </Nav.Item>
              {props.user === null ? (
                <div>
                  <Nav.Item>
                    <Link style={padding} id="RouterNavLink" className="navFont" to="/">
                      Login
                    </Link>
                  </Nav.Item>
                </div>
              ) : (
                <div>
                  <Nav.Item>
                    <Link
                      style={padding}
                      id="RouterNavLink"
                      className="navFont"
                      to="/"
                      onClick={props.handleLogout}
                    >
                      Logout
                    </Link>
                  </Nav.Item>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </div>
  )
}

export default Menu