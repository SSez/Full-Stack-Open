import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"

const Menu = (props) => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Bloglist</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link>
                <Link className="navFont" to="/">
                  Blogs
                </Link>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link>
                <Link className="navFont" to="/users">
                  Users
                </Link>
              </Nav.Link>
            </Nav.Item>

            {props.user === null ? (
              <div>
                <Nav.Item>
                  <Nav.Link>
                    <Link className="navFont" to="/">
                      Login
                    </Link>
                  </Nav.Link>
                </Nav.Item>
              </div>
            ) : (
              <div>
                <Nav.Item>
                  <Nav.Link>
                    <Link
                      className="navFont"
                      to="/"
                      onClick={props.handleLogout}
                    >
                      Logout
                    </Link>
                  </Nav.Link>
                </Nav.Item>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Menu
