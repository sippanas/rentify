import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

export class Register extends Component {
    static displayName = Register.name;

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            email: "",
            password: "",
            message: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({message: ""})

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
                this.setState({ message: "User created, please log in" });
            }
        },
            (error) => {
                this.setState({ message: error });
            }
        )
    };

    render() {
        const msg = this.state.message;

        return (
            <div className="mx-auto" style={{ width: "400px" }}>
                {msg.length > 0 && <Alert color="primary">{msg}</Alert>}
                <h2>Register new account</h2>
                <hr />
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup floating>
                        <Input id="userName" value={this.state.name} placeholder="Name" onChange={(e) => this.setState({ name: e.target.value })} />
                        <Label for="userName">Name</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input id="userSurname" value={this.state.surname} placeholder="Surname" onChange={(e) => this.setState({ surname: e.target.value })} />
                        <Label for="userSurname">Surname</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input id="userEmail" value={this.state.email} placeholder="Email" type="email" onChange={(e) => this.setState({ email: e.target.value })} />
                        <Label for="userEmail">Email</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input id="userPassword" value={this.statepassword} placeholder="Password" type="password" onChange={(e) => this.setState({ password: e.target.value })} />
                        <Label for="userPassword">Password</Label>
                    </FormGroup>
                    <Button color="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
        );
    }
}