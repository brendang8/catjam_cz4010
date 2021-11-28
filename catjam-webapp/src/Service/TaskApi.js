import axios from 'axios';

import {API_URL} from './constants'
var TASK_API_URL = API_URL + '/api/task'

class TaskApi {
    async fetchAllTask(callback){
        try {
            const res = await axios.get(TASK_API_URL + '/getAllTasks');
            if (res.status === 200) {
                callback(res.data);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async fetchTasksById(taskId, callback) {
        try {
            const res = await axios.get(TASK_API_URL + '/' + taskId);
            if (res.status === 200) {
                callback(res.data);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    
    fetchTasks() {
        return axios.get(TASK_API_URL + '/getAllTasks');
    }

    deleteTask(taskId) {
        return axios.delete(TASK_API_URL + '/' + taskId);
    }

    updateAssignedTo(taskId, user){
        return axios.put(TASK_API_URL + '/' + taskId + '/updateAssignedTo/' + user);
    }

    addTask(task) {
        return axios.post(TASK_API_URL + '/add' , task);
    }

    editTask(task) {
        return axios.put(TASK_API_URL + '/' + task.taskId, task);
    }

}

export default new TaskApi();