import React, { Component } from 'react';

export class NotFound extends Component {
    static displayName = NotFound.name;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mx-auto px-5 form-div">
                <h1>Whoops...</h1>
                <p>Looks like there's nothing here...</p>
                <p>You could be not allowed to access the page or the URL you're trying to access doesn't exist :(</p>
            </div>
        );
    }
}