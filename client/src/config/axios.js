import axios from "axios";

//baseURL: 'http://localhost:5000/api/'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/'
  });
export default instance; 