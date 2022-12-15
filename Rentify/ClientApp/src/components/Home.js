import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="mx-auto form-div text-center">
                <h1>Welcome to Rentify!</h1>
                <h6>Rental Managment Platform</h6>
            </div>
        );
    }
}
