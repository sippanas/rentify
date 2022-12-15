﻿import React, { useState, useEffect } from 'react';
import { UncontrolledTooltip, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import ObjectsService from '../../services/objects.service';
import authService from '../../services/auth.service';

const ObjectView = () => {
    const { objectTypeId, objectId } = useParams();
    const [object, setObject] = useState([]);

    useEffect(() => {
        const getData = async () => {
            await ObjectsService.getObject(objectTypeId, objectId)
                .then((data) => {
                    setObject(data);
                })
                .catch(() => {
                    return window.location.href = '/notfound';
                })
        };

        getData();

    }, []);

    const deleteObject = async (objectTypeId, objectId) => {
        await ObjectsService.deleteObject(objectTypeId, objectId)
            .then((response) => {
                if (response === true) {
                    return window.location.href = '/owned-objects';
                }
            })
            .catch(() => {
                return window.location.href = '/notfound';
            });
    };

    if (object.length < 1) {
        return 'Loading...';
    }

    return (
        <div className="card text-center mx-5">
            <div className="card-header">{object.objectType.name} | {object.address}</div>
            <div className="card-body">
                <h5 className="card-title">€{object.price}/month</h5>
                <p className="card-text">{object.relevantInformation}</p>
                {authService.getUserId() == object.ownerId ?
                    (<a href={`/object-type/${object.objectType.id}/object/${object.id}/edit?address=${object.address}&price=${object.price}&releveantInformation=${object.relevantInformation}`}
                        className="btn btn-primary">Edit property information</a>) : ''}
                {' '}
                <a href="#" className="btn btn-warning">View room information</a>
                {' '}
                {authService.getUserId() == object.ownerId ?
                    (<Button color="danger" onClick={() => deleteObject(objectTypeId, objectId)}>
                        Delete property
                    </Button>) : ''}
            </div>
            <div className="card-footer">
                {object.occupierId == null ? <>
                    <Icon.PersonDash id="NotOccupiedIcon" size="20" /><span className="ms-2">-</span>
                    <UncontrolledTooltip className="d-none d-sm-block" placement="bottom" target="NotOccupiedIcon">
                        This property is currently open for renting
                    </UncontrolledTooltip>
                    </>
                    :
                    <><UncontrolledTooltip className="d-none d-sm-block" placement="bottom" target="CurrentOccupierIcon">
                            This property is rented to {object.occupier.realName} {object.occupier.realSurname}
                        </UncontrolledTooltip>
                        <Icon.PersonCheck id="CurrentOccupierIcon" size="20" />
                        <span className="ms-2">{object.occupier.realName} {object.occupier.realSurname}</span>
                    </>}
            </div>
        </div>
    );
};

export default ObjectView;