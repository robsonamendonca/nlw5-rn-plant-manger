import axios from 'axios';

const api = axios.create({
    baseURL: 'https://my-json-server.typicode.com/robsonamendonca/api-plantmanager',

});


export default api;