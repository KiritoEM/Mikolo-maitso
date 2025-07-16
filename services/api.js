import axios from "axios";

//instance de l'action

const api = axios.create({
    baseURL:'http://localhost:5000',
    headers:{
        "Content-Type":'application/json', //envoi de donnees format json
    }
});
export default api;