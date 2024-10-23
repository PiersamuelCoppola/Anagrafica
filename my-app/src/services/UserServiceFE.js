import axios from 'axios'
//path chiamate API utilizzate
const USER_BASE_REST_API_URL = 'http://localhost:8080/user/getAllUser'
const USER_CREATEUSER_REST_API_URL = 'http://localhost:8080/auth/signup'
const USER_SIGNIN_REST_API_URL = 'http://localhost:8080/auth/signin'
const USER_GETUSERBYID_REST_API_URL = 'http://localhost:8080/user/ricercaUser'
const USER_UPDATE_REST_API_URL = 'http://localhost:8080/auth/updateUser'

class UserServiceFE {

    getAllUser(token) {
        return axios.get(USER_BASE_REST_API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    getUserById(userId, token) {
        return axios.get(`${USER_GETUSERBYID_REST_API_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    createUser(user, token) {
        return axios.post(USER_CREATEUSER_REST_API_URL, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    signUp(user) {
        return axios.post(USER_CREATEUSER_REST_API_URL, user);
    }

    logIn(user) {
        return axios.post(USER_SIGNIN_REST_API_URL, user)
    }

    updateUser(user, token) {
        return axios.patch(USER_UPDATE_REST_API_URL, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

}

export default new UserServiceFE();