import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.88.42:5000', 
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export default api;
