import axios from 'axios';
import authService from '../services/auth.service';

const getOwnedObjectsByUser = () => {
    return axios.get('api/objects/owned', {
        headers: {
            'Authorization': `Bearer ${authService.getUserToken()}`
        }
    })
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
        });
};

const getRentedObjectsByUser = () => {
    return axios.get('api/objects/rented', {
        headers: {
            'Authorization': `Bearer ${authService.getUserToken()}`
        }
    })
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
        });
}

const getObject = (objectTypeId, id) => {
    return axios.get(`api/object-types/${objectTypeId}/objects/${id}`, {
        headers: {
            'Authorization': `Bearer ${authService.getUserToken()}`
        }
    })
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
        })
};

const createObject = (objectTypeId, address, price, relevantInformation) => {
    return axios.post(`api/object-types/${objectTypeId}/objects`, { address, price, relevantInformation }, {
        headers: {
            'Authorization': `Bearer ${authService.getUserToken()}`
        }
    })
        .then((response) => {
            if (response.status === 201) {
                return true;
            }
        });
};

const updateObject = (objectTypeId, objectId, address, price, relevantInformation) => {
    return axios.put(`api/object-types/${objectTypeId}/objects/${objectId}`, { address, price, relevantInformation }, {
        headers: {
            'Authorization': `Bearer ${authService.getUserToken()}`
        }
    })
        .then((response) => {
            if (response.status === 200) {
                return true;
            }
        });
};

const deleteObject = (objectTypeId, objectId) => {
    return axios.delete(`api/object-types/${objectTypeId}/objects/${objectId}`, {
        headers: {
            'Authorization': `Bearer ${authService.getUserToken()}`
        }
    })
        .then((response) => {
            if (response.status === 204) {
                return true;
            }
        })
};

const ObjectsService = {
    getOwnedObjectsByUser,
    getRentedObjectsByUser,
    getObject,
    createObject,
    updateObject,
    deleteObject
};

export default ObjectsService;