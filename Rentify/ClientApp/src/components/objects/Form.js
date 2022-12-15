import React, { useState, useEffect, useRef } from 'react';
import {
    Alert,
    Form,
    Dropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    FormGroup,
    Input,
    Label,
    Button
} from 'reactstrap';
import { useParams, useSearchParams } from 'react-router-dom';
import validator from 'validator';
import ObjectsService from '../../services/objects.service';
import ObjectTypesService from '../../services/object-types.service';

const ObjectsForm = (props) => {
    const [searchParams] = useSearchParams();
    const { objectTypeId, objectId } = useParams();
    const [formValues, setFormValues] = useState({
        address: `${searchParams.get('address') != undefined ? searchParams.get('address') : ''}`,
        price: `${searchParams.get('price') != undefined ? searchParams.get('price') : ''}`,
        relevantInformation: `${searchParams.get('relevantInformation') != undefined ? searchParams.get('relevantInformation') : ''}`
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownValues, setDropdownValues] = useState([]);
    const [dropdownState, setDropdownState] = useState({ id: -1, value: '-'});
    const [formErrors, setFormErrors] = useState({
        type: 'Property type is required',
        address: 'Address is required',
        price: 'Price is required',
        relevantInformation: ''
    });
    const [formValid, setFormValid] = useState(false);
    const firstRender = useRef(true);


    const onSubmit = async (e) => {
        e.preventDefault();

        if (props.formType === "edit") {
            await ObjectsService
                .updateObject(objectTypeId, objectId, formValues.address, formValues.price, formValues.relevantInformation)
                .then((response) => {
                    if (response === true) {
                        return window.location.href = `/object-type/${objectTypeId}/object/${objectId}`;
                    }
                })
                .catch(() => {
                    return window.location.href = '/notfound';
                });
        }
        else {
            await ObjectsService.createObject(dropdownState.id,
                formValues.address, formValues.price, formValues.relevantInformation)
                .then((response) => {
                    if (response === true) {
                        return window.location.href = '/owned-objects';
                    }
                })
                .catch(() => {
                    return window.location.href = '/notfound';
                });
        }
    };

    useEffect(() => {
        const populateObjectTypes = async () => {
            await ObjectTypesService.getAllObjectTypes()
                .then((data) => {
                    setDropdownValues(data);
                });
        }

        if (firstRender.current) {
            populateObjectTypes();
            firstRender.current = false;
        }

        const validateForm = () => {
            let errors = formErrors;

            if (dropdownState.id == -1 && props.formType !== "edit") {
                errors.type = 'Property type is required';
            }
            else errors.type = '';

            if (validator.isEmpty(formValues.address)) {
                errors.address = 'Address is required';
            }
            else errors.address = '';

            if (validator.isEmpty(formValues.price) || !validator.isNumeric(formValues.price) ||
                formValues.price < 1 || formValues.price > 100000) {
                errors.price = 'Invalid price';
            }
            else errors.price = '';

            if (formValues.relevantInformation.length > 100) {
                errors.relevantInformation = 'Relevant information can not exceed 100 characters';
            }
            else errors.relevantInformation = '';

            setFormErrors({ ...errors });

            if (validator.isEmpty(formErrors.type) &&
                validator.isEmpty(formErrors.address) &&
                validator.isEmpty(formErrors.price) &&
                validator.isEmpty(formErrors.relevantInformation)) {
                setFormValid(true);
            } else {
                setFormValid(false);
            }
        };

        validateForm();

    }, [formValues, dropdownState]);

    const handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormValues({ ...formValues, [name]: value });
    }

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const dropdownValueChanged = (sender) => {
        const newId = sender.currentTarget.getAttribute("dropdownvalue");
        const newValueObject = dropdownValues.find((item) => {
            return item.id == newId;
        });

        let newState = { 
            id: newId,
            value: newValueObject.name
        };

        setDropdownState({ ...newState });
    }

    return (
        <div className="mx-auto px-5 form-div">
            {!formValid &&
                <Alert color="primary">
                    {formErrors.type}{formErrors.type.length > 0 && <br />}
                    {formErrors.address}{formErrors.address.length > 0 && <br />}
                    {formErrors.price}{formErrors.price.length > 0 && <br />}
                    {formErrors.relevantInformation}
                </Alert>
            }

            <h2>{props.formType === "edit" ? 'Edit property' : 'Create new property'}</h2>
            {props.formType === "edit" ? (<><p>Editing property <strong>{searchParams.get('address')}</strong> </p></>) : ('')}
            <hr />
            <Form onSubmit={onSubmit} noValidate>
                {props.formType != "edit" &&
                    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
                        <DropdownToggle caret>{dropdownState.value}</DropdownToggle>
                        <DropdownMenu>
                            {dropdownValues.map((item) => {
                                return <DropdownItem key={item.id}
                                    dropdownvalue={item.id}
                                    onClick={dropdownValueChanged}>{item.name}</DropdownItem>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                }
                <br />
                <FormGroup floating>
                    <Input id="objectAddress" value={formValues.address} name="address" placeholder="Address"
                        onChange={(e) => handleUserInput(e)} maxLength={100} />
                    <Label for="objectAddress">Address</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input id="objectPrice" value={formValues.price} name="price" placeholder="Price"
                        onChange={(e) => handleUserInput(e)} maxLength={7} />
                    <Label for="objectPrice">Price</Label>
                </FormGroup>
                <FormGroup floating>
                    <Input id="objectInfo" value={formValues.relevantInformation} name="relevantInformation" placeholder="Relevant Information"
                        onChange={(e) => handleUserInput(e)} maxLength={100} />
                    <Label for="objectInfo">Relevant information</Label>
                </FormGroup>

                <Button color={props.formType === "edit" ? "secondary" : "success"}
                    type="submit" disabled={!formValid}>
                    {props.formType === "edit" ? <>Update</> : <>Create</>}
                </Button>
            </Form>
        </div>
    );
};

export default ObjectsForm;