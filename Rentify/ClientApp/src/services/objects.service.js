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

const ObjectsService = {
    getOwnedObjectsByUser,
    getRentedObjectsByUser,
    getObject
};

export default ObjectsService;