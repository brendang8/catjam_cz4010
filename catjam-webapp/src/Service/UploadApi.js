import axios from 'axios';

import {API_URL} from './constants'
var UPLOAD_API_URL = API_URL + '/api/upload'

class UploadApi {

    upload(formData){
        axios.post(UPLOAD_API_URL, formData, 
        {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export default new UploadApi();
