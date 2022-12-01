import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export class Register extends Component {
    static displayName = Register.name;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mx-auto" style={{width: "400px"}}>
                <h2>Register new account</h2>
                <hr />
                <Form>
                    <FormGroup floating>
                        <Input id="userName" name="name" placeholder="Name" />
                        <Label for="userName">Name</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input id="userSurname" name="surname" placeholder="Surname" />
                        <Label for="userSurname">Surname</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input id="userEmail" name="email" placeholder="Email" type="email" />
                        <Label for="userEmail">Email</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input id="userPassword" name="password" placeholder="Password" type="password" />
                        <Label for="userPassword">Password</Label>
                    </FormGroup>
                    <Button color="primary">
                        Register
                    </Button>
                </Form>
            </div>
        );
    }
}