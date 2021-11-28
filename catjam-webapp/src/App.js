import React from 'react';
import './App.css';
import Route from "./component/router/Route";
import axios from 'axios';

axios.defaults.params = {};

axios.interceptors.request.use(
  config =>{
    if (localStorage.getItem("access_token") == null) {return config}
    config.params = {access_token: localStorage.getItem("access_token")}
    //config.headers['Access-Control-Allow-Origin'] = '*';
    console.log(config)
    return config;
  },
  error => {return Promise.reject(error)}
);

function App() {
  return (
    <div className="App">
      <Route/>
    </div>
  );
}

export default App;
