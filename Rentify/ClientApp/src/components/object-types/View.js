import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import ObjectTypesService from '../../services/object-types.service';
import authService from '../../services/auth.service';

const ObjectTypesList = () => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        const getData = async () => {
            await ObjectTypesService.getAllObjectTypes()
                .then((data) => {
                    setTypes(data);
                })
        }

        getData().catch(() => {
            window.location.href = '/notfound'
        });

    }, []);

    const deleteObjectType = async (id) => {
        await ObjectTypesService.deleteObjectType(id)
            .then((response) => {
                if (response === true) {
                    return window.location.reload();
                }
            });
    };

    if (!authService.IsUserAdmin()) {
        window.location.href = '/notfound';
        return 'Loading...';
    }

    return (
        <div>
            <h1>Property types managment</h1>
            <Button color="primary" size="sm" onClick={() => window.location.href = '/object-types/create' }>
                Create new type
            </Button>
            <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Property Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {types.map((type) => {
                        return (<tr key={type.id}>
                            <td>{type.id}</td>
                            <td>{type.name}</td>
                            <td>
                                <Link to={`/object-types/edit/${type.id}?name=${type.name}`}>
                                    <Button color="secondary" size="sm">
                                        Edit
                                    </Button>
                                </Link>
                                {' '}
                                <Button color="danger" size="sm" onClick={() => deleteObjectType(type.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default ObjectTypesList;