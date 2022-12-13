import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from '../services/auth.service';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor (props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar () {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    isLoggedIn() {
        return authService.getCurrentUser();
    }

    logOutUser() {
        return authService.logout();
    }

    render() {
        return (
            <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/">Rentify</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        {this.isLoggedIn() ?
                                (<NavbarText>Hello, {authService.getUserEmail()}</NavbarText>) : ''}
                        {this.isLoggedIn() ?
                            (<NavItem>
                                <NavLink href='/login' className="text-dark" onClick={this.logOutUser}>Logout</NavLink>
                            </NavItem>)
                            :
                            (<NavItem>
                                <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                            </NavItem>)
                        }
                    </ul>
                </Collapse>
            </Navbar>
            </header>
        );
    }
}
