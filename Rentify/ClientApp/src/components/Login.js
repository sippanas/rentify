import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import validator from 'validator';
import authService from '../services/auth.service';

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: {
                email: 'Please enter email',
                password: 'Please enter password'
            },
            formValid: false,
            message: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ message: '' });


        if (this.state.formValid) {
            await authService.login(this.state.email, this.state.password)
                .then((response) => {
                    if (response.status === 200) {
                        window.location.href = '/';
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ message: 'Incorrect email or password' });
                })
        }
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let errors = this.state.formErrors;

        switch (fieldName) {
            case 'email':
                errors.email = validator.isEmail(value) ? '' : 'Not a valid email address (ex. hello@rentify.com)';
                break;

            case 'password':
                errors.password = validator.isEmpty(value) ? 'Please enter password' : '';
                break;
        }

        this.setState({ formErrors: errors }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid:
                validator.isEmpty(this.state.formErrors.email) &&
                validator.isEmpty(this.state.formErrors.password)
        });
    }

    render() {
        return (
            <div className="mx-auto px-5 form-div">
                {this.state.message.length > 0 && <Alert color="danger">{this.state.message}</Alert>}

                {!this.state.formValid &&
                    <Alert color="primary">
                        {this.state.formErrors.email}<br/>
                        {this.state.formErrors.email.length > 0 && <br />}{this.state.formErrors.password}
                    </Alert>}

                <h2>Login</h2>
                <hr />
                <Form onSubmit={this.handleSubmit} noValidate>
                    <FormGroup floating>
                        <Input id="userEmail" value={this.state.email} name="email" placeholder="Email" type="email"
                            onChange={(e) => this.handleUserInput(e)} />
                        <Label for="userEmail">Email</Label>
                    </FormGroup>
                    {' '}
                    <FormGroup floating>
                        <Input id="userPassword" value={this.state.password} name="password" placeholder="Password" type="password"
                            onChange={(e) => this.handleUserInput(e)} />
                        <Label for="userPassword">Password</Label>
                    </FormGroup>
                    {' '}
                    <Button color="primary" disabled={!this.state.formValid}>
                        Login
                    </Button>
                </Form>
                <p style={{ marginTop: 20 }}>Don't have an account? <a href="/register">Register</a> a new one</p>
            </div>
        );
    }
}