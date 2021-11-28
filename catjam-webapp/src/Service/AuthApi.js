import {API_URL} from './constants'
import axios from 'axios';
//const AUTH_API_URL = API_URL + '/authenticate';
const clientId = "username";
const clientSecret = "secret";

class AuthApi {

    async login(userdetails, callback){
        var bodyFormData = new FormData();
        bodyFormData.set('grant_type', 'password');
        bodyFormData.set('username', userdetails.username);
        bodyFormData.set('password', userdetails.password);
        localStorage.clear();

        try{
            const res = await axios.request({
                url: "/oauth/token",
                method: "post",
                baseURL: API_URL,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                auth: {
                  username: clientId, // This is the client_id
                  password: clientSecret // This is the client_secret
                },
                data: bodyFormData
              })
              console.log(res)
              if (res.status === 200) {
                callback(res.data);
            }
        }
        catch (err) {
            console.log("Invalid credentials");
            callback("Invalid credentials");
        }
    }
    /*
    async login(userdetails, callback) {
        try {
            let config = {
               headers: { 
                   'Access-Control-Allow-Origin':'*',
                   'Content-Type': 'application/json'
            }
            };
            localStorage.clear();
            const res = await axios.post(AUTH_API_URL, userdetails, config);
            if (res.status === 200) {
                callback(res.data);
            }
        }
        catch (err) {
            console.log("Invalid credentials");
            callback("Invalid credentials");
        }
    }
    */
}

export default new AuthApi();