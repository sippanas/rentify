import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import validator from 'validator';

export class Register extends Component {
    static displayName = Register.name;

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',
            message: '',
            messageAlertClass: '',
            formErrors: {
                name: 'Please enter name',
                surname: 'Please enter surname',
                email: 'Please enter email',
                password: 'Please enter password (6 lowercase characters with 1 digit included)'
            },
            formValid: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ message: '' })

        if (this.state.formValid) {
            fetch('api/register', {
                method: "POST",
                headers: new Headers({ 'content-type': 'application/json' }),
                body: JSON.stringify({
                    name: this.state.name,
                    surname: this.state.surname,
                    email: this.state.email,
                    password: this.state.password
                }),
            }).then((result) => {
                if (result.ok) {
                    this.setState({ message: 'User created, please log in', messageAlertClass: 'success' });
                }
                else if (!result.ok) {
                    this.setState({ message: 'Server error', messageAlertClass: 'danger' });
                }
            })
        }
    };

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let errors = this.state.formErrors;

        switch (field) {
            case 'name':
                errors.name = value.match(/^[A-Z][a-z]+$/) && value.length >= 3
                    ? '' : 'Name must have atleast 3 letters and must start with an uppercase letter (ex. Tom)';
                break;

            case 'surname':
                errors.surname = value.match(/^[A-Z][a-z]+$/) && value.length >= 3
                    ? '' : 'Surname must have atleast 3 letters and must start with an uppercase letter (ex. Lee)';
                break;

            case 'email':
                errors.email = validator.isEmail(value) ? '' : 'Not a valid email address (ex. hello@rentify.com)';
                break;

            case 'password':
                errors.password = validator.isStrongPassword(value,
                    { minLength: 6, minUppercase: 0, minSymbols: 0 }) ? '' : 'Password requires atleast 6 characters (1 digit is a must)';
                break;
        }

        this.setState({ formErrors: errors }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid:
                validator.isEmpty(this.state.formErrors.name) &&
                validator.isEmpty(this.state.formErrors.surname) &&
                validator.isEmpty(this.state.formErrors.email) &&
                validator.isEmpty(this.state.formErrors.password)
            });
    }

    render() {
        const msg = this.state.message;

        return (
            <div className="mx-auto px-5 form-div">
                {msg.length > 0 && <Alert color={this.state.messageAlertClass}>{msg}</Alert>}

                {!this.state.formValid &&
                    <Alert color="primary">
                        {this.state.formErrors.name}{this.state.formErrors.name.length > 0 && <><br /><br /></>}
                        {this.state.formErrors.surname}{this.state.formErrors.surname.length > 0 && <><br /><br/></>}
                        {this.state.formErrors.email}{this.state.formErrors.email.length > 0 && <br />}
                        {this.state.formErrors.email.length > 0 && <br />}{this.state.formErrors.password}
                    </Alert>}

                <h2>Register new account</h2>
                <hr />
                <Form onSubmit={this.handleSubmit} noValidate>
                    <FormGroup floating>
                        <Input id="userName" value={this.state.name} name="name" placeholder="Name"
                            onChange={(e) => this.handleUserInput(e)} />
                        <Label for="userName">Name</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input id="userSurname" value={this.state.surname} name="surname" placeholder="Surname"
                            onChange={(e) => this.handleUserInput(e)} />
                        <Label for="userSurname">Surname</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input id="userEmail" value={this.state.email} name="email" placeholder="Email" type="email"
                            onChange={(e) => this.handleUserInput(e)} />
                        <Label for="userEmail">Email</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input id="userPassword" className="form-control" value={this.state.password} name="password" placeholder="Password" type="password"
                            onChange={(e) => this.handleUserInput(e)} />
                        <Label for="userPassword">Password</Label>
                    </FormGroup>
                    <Button color="primary" type="submit" disabled={!this.state.formValid}>
                        Register
                    </Button>
                </Form>
            </div>
        );
    }
}