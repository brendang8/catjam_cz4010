import axios from 'axios';
import {API_URL} from './constants'
var ACCOUNT_API_URL = API_URL + '/api/account'

class AccountApi {

    fetchAccounts(callback) {
        return axios.get(ACCOUNT_API_URL + '/getAllAccounts').then( res =>{
            if (res.status === 200){
                callback(res.data)
            }
        })
        .catch(err => {
            console.log(err)
        });
    }

    fetchAllAccounts() {
        return axios.get(ACCOUNT_API_URL + '/getAllAccounts');
    }

    async fetchAccountById(accId, callback) {
        try {
            const res = await axios.get(ACCOUNT_API_URL + '/' + accId);
            if (res.status === 200) {
                callback(res.data);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    deleteAccount(accId) {
        return axios.delete(ACCOUNT_API_URL + '/' + accId);
    }

    addAccount(acc) {
        return axios.post(ACCOUNT_API_URL + '/add', acc);
    }

    editAccount(acc) {
        return axios.put(ACCOUNT_API_URL + '/' + acc.id, acc);
    }

}

export default new AccountApi();