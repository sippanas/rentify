import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import validator from 'validator';
import { useParams, useSearchParams } from 'react-router-dom';
import ObjectTypesService from '../../services/object-types.service';
import authService from '../../services/auth.service';

const ObjectTypesForm = (props) => {
    const [searchParams] = useSearchParams();
    const [formValues, setFormValues] = useState({
        name: `${searchParams.get('name') != undefined ? searchParams.get('name') : ''}`
    });
    const [formErrors, setFormErrors] = useState({ name: 'Type name is required' });
    const [formValid, setFormValid] = useState(false);
    const { typeId } = useParams();

    const onSubmit = async (e) => {
        e.preventDefault();

        if (props.formType === "edit") {
            if (formValues.name === searchParams.get('name')) {
                return;
            }

            await ObjectTypesService.updateObjectType(typeId, formValues.name)
                .then((response) => {
                    if (response === true) {
                        window.location.href = '/object-types/';
                    }
                })
        }
        else {
            await ObjectTypesService.createObjectType(formValues.name)
                .then((response) => {
                    if (response === true) {
                        window.location.href = '/object-types/';
                    }
                });
        }
    };

    const handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues({ formValues, [name]: value });
    }

    useEffect(() => {
        const validateForm = () => {
            let errors = formErrors;

            if (validator.isEmpty(formValues.name)) {
                errors.name = 'Type name is required';
            }
            else errors.name = '';

            setFormErrors(errors);

            if (validator.isEmpty(formErrors.name)) {
                setFormValid(true);
            } else {
                setFormValid(false);
            }
        };

        validateForm();

    }, [formValues]);

    if (!authService.IsUserAdmin()) {
        window.location.href = '/notfound';
        return 'Loading...';
    }

    return (
        <div className="mx-auto px-5 form-div">
            {!formValid &&
                <Alert color="primary">
                    {formErrors.name}
                </Alert>
            }

            <h2>{props.formType === "edit" ? 'Edit type' : 'Create new type'}</h2>
            {props.formType === "edit" ? (<><p>Editing type with ID {typeId}</p></>) : ('')}
            <hr />
            <Form onSubmit={onSubmit} noValidate>
                <FormGroup floating>
                    <Input id="typeName" value={formValues.name} name="name" placeholder="Type name"
                        onChange={(e) => handleUserInput(e)} />
                    <Label for="typeName">Type name</Label>
                </FormGroup>
                <Button color={props.formType === "edit" ? "secondary" : "success"}
                    type="submit" disabled={!formValid}>
                    {props.formType === "edit" ? <>Update</> : <>Create</>}
                </Button>
            </Form>
        </div>
        );
};

export default ObjectTypesForm;