import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import AddEvent from './AddEvent'

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';


class NavbarPage extends Component {
  render() {
    if (!localStorage.getItem('token')) {
      return (
        <Navbar className="navbar-dark bg-dark" light expand="md">
          <NavbarBrand href="/"><h3>Events</h3></NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/login/" >Login</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      )
    }
    return (
      <Navbar className="navbar-dark bg-dark" light expand="md">
        <NavbarBrand href="/"><h3>Events</h3></NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink
              tag={Link}
              onClick={() => {
                localStorage.removeItem('token')
                localStorage.removeItem('uid')
              }}
              to="/login">
              Logout
            </NavLink>
          </NavItem>
          <NavItem>
            <AddEvent />
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default withRouter(NavbarPage)