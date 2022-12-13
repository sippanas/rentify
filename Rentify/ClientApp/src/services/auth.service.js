import axios from 'axios';
import jwt_decode from 'jwt-decode';

const contentHeader = new Headers({ 'content-type': 'application/json' });

const register = (name, surname, email, password) => {
    return axios
        .post('api/register', { name, surname, email, password }, {
            headers: contentHeader
        });
};

const login = (email, password) => {
    return axios
        .post('api/login', { email, password }, {
            headers: contentHeader
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response;
        })
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return localStorage.getItem("user");
};

const decodeUserToken = () => {
    if (getCurrentUser()) {
        const user = JSON.parse(getCurrentUser());
        const decodedToken = jwt_decode(user.accessToken);

        return decodedToken;
    }
};

const getUserEmail = () => {
    if (getCurrentUser()) {
        const token = decodeUserToken();

        return token.email;
    }
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
    getUserEmail
}

export default authService;