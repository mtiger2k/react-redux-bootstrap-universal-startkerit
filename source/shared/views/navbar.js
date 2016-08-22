import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import Settings from '../settings';

class NavBar extends React.Component {
    render() {
        return (
            <Navbar fixedTop inverse componentClass="header">
            <Navbar.Header>
            <Navbar.Brand>
            <a href="#">{Settings.title}</a>
</Navbar.Brand>
<Navbar.Toggle />
</Navbar.Header>
<Navbar.Collapse>
<Nav>
<NavItem eventKey={1} href="#">Link</NavItem>
    <NavItem eventKey={2} href="#">Link</NavItem>
    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
    <MenuItem eventKey={3.1}>Action</MenuItem>
    <MenuItem eventKey={3.2}>Another action</MenuItem>
<MenuItem eventKey={3.3}>Something else here</MenuItem>
<MenuItem divider />
<MenuItem eventKey={3.3}>Separated link</MenuItem>
</NavDropdown>
</Nav>
{this.props.isAuthenticated &&
<Nav pullRight>
<LinkContainer to={{pathname: "/settings"}}>
<NavItem eventKey={1}>Settings({this.props.user.dispName})</NavItem>
</LinkContainer>
<LinkContainer to={{pathname: "/logout"}}>
<NavItem eventKey={2}>Logout</NavItem>
    </LinkContainer>
    </Nav>
}
{!this.props.isAuthenticated &&
<Nav pullRight>
<LinkContainer to={{pathname: "/login"}}>
<NavItem eventKey={1}>Login</NavItem>
    </LinkContainer>
    <LinkContainer to={{pathname: "/signup"}}>
<NavItem eventKey={2}>Sign Up</NavItem>
</LinkContainer>
</Nav>
}
</Navbar.Collapse>
</Navbar>
)
}
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.authenticated,
        user: state.user
    }
}

export default connect(mapStateToProps)(NavBar)