import axios from 'axios';

import {API_URL} from './constants'
var USER_API_URL = API_URL + '/api/user'

class UserApi {

    async fetchAllUsers(callback){
        try {
            const res = await axios.get(USER_API_URL + '/getAllUsers');
            if (res.status === 200) {
                callback(res.data);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async fetchUsers() {
        return await axios.get(USER_API_URL + '/getAllUsers');
    }

    fetchUsersById(userId) {
        return axios.get(USER_API_URL + '/' + userId);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_URL + '/' + userId);
    }

    addUser(user) {
        return axios.post(USER_API_URL + '/add', user);
    }

    editTask(user) {
        return axios.put(USER_API_URL + '/' + user.id, user);
    }

}

export default new UserApi();