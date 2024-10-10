import axios from 'axios'
//path chiamate API utilizzate
const USER_BASE_REST_API_URL = 'http://localhost:8080/user/getAllUser'
const USER_SIGNUP_REST_API_URL = 'http://localhost:8080/auth/signup'
const USER_SIGNIN_REST_API_URL = 'http://localhost:8080/auth/signin'
const USER_GETUSERBYID_REST_API_URL = 'http://localhost:8080/user/ricercaUser'
const USER_UPDATE_REST_API_URL = 'http://localhost:8080/auth/updateUser'
class UserServiceFE {

    getAllUser() {
        return axios.get(USER_BASE_REST_API_URL)
    }

    getUserById(userId) {
        return axios.get(USER_GETUSERBYID_REST_API_URL + '/' + userId)
    }

    createUser(user) {
        return axios.post(USER_SIGNUP_REST_API_URL, user)
    }

    logIn(user) {
        return axios.post(USER_SIGNIN_REST_API_URL, user)
    }

    updateUser(user) {
        return axios.patch(USER_UPDATE_REST_API_URL, user)
    }

}

export default new UserServiceFE();