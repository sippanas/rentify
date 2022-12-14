import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    NavbarText,
    UncontrolledTooltip
} from 'reactstrap';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
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
                        {this.isLoggedIn() && authService.IsUserAdmin() ?
                            (<><NavItem>
                                <NavLink tag={Link} to="/object-types">
                                    <Icon.HouseGear id="PropertyTypesIcon" color="black" size="22" />
                                    <UncontrolledTooltip className="d-none d-sm-block" placement="bottom" target="PropertyTypesIcon">
                                        Manage property types
                                    </UncontrolledTooltip>
                                </NavLink>
                            </NavItem></>) : ''}

                        {this.isLoggedIn() ?
                        (<>
                            <NavItem>
                                <NavLink tag={Link} to="/counter">
                                    <Icon.Houses id="OwnedPropertyIcon" color="black" size="22"/>
                                    <UncontrolledTooltip className="d-none d-sm-block" placement="bottom" target="OwnedPropertyIcon">
                                        My owned property
                                    </UncontrolledTooltip>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/fetchdata">
                                    <Icon.HouseFill id="RentedPropertyIcon" color="black" size="22" />
                                    <UncontrolledTooltip className="d-none d-sm-block" placement="bottom" target="RentedPropertyIcon">
                                        My rented property
                                    </UncontrolledTooltip>
                                </NavLink>
                            </NavItem>
                            <NavbarText className="mx-3 d-none d-sm-block">|</NavbarText>
                            <NavbarText>Hello, {authService.getUserEmail()}</NavbarText>
                            </>) : ''
                        }

                        {this.isLoggedIn() ?
                            (<NavItem>
                                <NavLink href='/login' onClick={this.logOutUser}>
                                    <Icon.BoxArrowRight id="LogoutIcon" color="black" size="22" />
                                    <UncontrolledTooltip className="d-none d-sm-block" placement="bottom" target="LogoutIcon">
                                        Log out
                                    </UncontrolledTooltip>
                                </NavLink>
                            </NavItem>)
                            :
                            (<NavItem>
                                <NavLink tag={Link}  to="/login">
                                    <Icon.PersonCircle id="AccountIcon" color="black" size="22" />
                                    <UncontrolledTooltip className="d-none d-sm-block" placement="bottom" target="AccountIcon">
                                        Account
                                    </UncontrolledTooltip>
                                </NavLink>
                            </NavItem>)
                        }
                    </ul>
                </Collapse>
            </Navbar>
            </header>
        );
    }
}
