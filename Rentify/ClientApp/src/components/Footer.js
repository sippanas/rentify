import React, { Component } from 'react';

export class Footer extends Component {
    static displayName = Footer.name;

    render() {
        const date = new Date();
        return (
            <div className="container">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <p className="col-md-4 mb-0 text-muted">&copy; {date.getFullYear()} Rentify</p>
                </footer>
            </div>
        );
    }
}