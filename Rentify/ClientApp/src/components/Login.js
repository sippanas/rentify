import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mx-auto px-5 form-div">
                <h2>Login</h2>
                <hr/>
                <Form>
                    <FormGroup floating>
                        <Input id="userEmail" name="email" placeholder="Email" type="email" />
                        <Label for="userEmail">Email</Label>
                    </FormGroup>
                    {' '}
                    <FormGroup floating>
                        <Input id="userPassword" name="password" placeholder="Password" type="password" />
                        <Label for="userPassword">Password</Label>
                    </FormGroup>
                    {' '}
                    <Button color="primary">
                        Log me in
                    </Button>
                </Form>
                <p style={{ marginTop: 20 }}>Don't have an account? <a href="/register">Register</a> a new one</p>
            </div>
        );
    }
}