import React, { useState, useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';
import ObjectsService from '../../services/objects.service';

const ObjectsList = (props) => {
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        const getData = async () => {
            if (props.ownership == "true") {
                await ObjectsService.getOwnedObjectsByUser()
                    .then((data) => {
                        setObjects(data);
                    });
            }
            else {
                await ObjectsService.getRentedObjectsByUser()
                    .then((data) => {
                        setObjects(data);
                    });
            }
        };

        getData().catch(() => {
            return window.location.href = '/notfound';
        });

    }, [props.ownership]);

    return (
        <div className="list-group w-auto">
            <h1 className="position-relative top-50 start-50 translate-middle">My {props.ownership == "true" ? 'owned' : 'rented'} properties</h1>
            <a href="#" className={"list-group-item " + (props.ownership == "true" ? "list-group-item-success" : "list-group-item-warning") +
                                        " list-group-item-action d-flex gap-3 py-3"}
                aria-current="true">
                {props.ownership == "true" ? 
                    <><Icon.HouseAdd color="black" size="22" /></> : <><Icon.HouseAddFill color="black" size="22" /></>}
                <div className="d-flex gap-2 w-100 justify-content-between">
                    <div>
                        <h6 className="mb-0">{props.ownership == "true" ? 'Create new property' : 'Join property for rent'}</h6>
                    </div>
                </div>
            </a>
            {objects.map((object) => {
                return (<a key={object.id} href={`/object-type/${object.objectTypeId}/object/${object.id}?isOwner=${props.ownership}`}
                        className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                        {props.ownership == "true" ? <><Icon.Houses color="black" size="22" /></> : <> <Icon.HouseFill color="black" size="22" /></>}
                        <div className="d-flex gap-2 w-100 justify-content-between">
                            <div>
                                <h6 className="mb-0">{object.address}</h6>
                            <p className="mb-0 opacity-75">{object.objectType.name}</p>
                            </div>
                        </div>
                    </a>)
            })}
        </div>
    );
};

export default ObjectsList;