import axios from 'axios';
import authService from '../services/auth.service';

const getAllObjectTypes = () => {
    return axios.get('api/object-types/', {
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

const getObjectType = (typeId) => {
    return axios.get('api/object-types/' + typeId, {
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

const createObjectType = (name) => {
    return axios.post('api/object-types/', { name }, {
        headers: {
            'Authorization': `Bearer ${authService.getUserToken()}`
        }
    })
        .then((response) => {
            if (response.status === 201) {
                return true;
            }
        })
        .catch(() => {
            return window.location.href = '/notfound';
        });
};

const updateObjectType = (id, newName) => {
    return axios.put('api/object-types/' + id, { name: newName }, {
        headers: {
            'Authorization': `Bearer ${authService.getUserToken()}`
        }
    })
        .then((response) => {
            if (response.status === 200) {
                return true;
            }
        })
        .catch(() => {
            return window.location.href = '/notfound';
        });
}

const deleteObjectType = (id) => {
    return axios.delete('api/object-types/' + id, {
        headers: {
            'Authorization': `Bearer ${authService.getUserToken()}`
        }
    })
        .then((response) => {
            if (response.status === 204) {
                return true;
            }
        })
        .catch(() => {
            window.location.href = '/notfound';
        });
};

const ObjectTypesService = {
    getAllObjectTypes,
    getObjectType,
    createObjectType,
    updateObjectType,
    deleteObjectType
}

export default ObjectTypesService;