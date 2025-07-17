import axios from "axios";
import { FLASK_BASE_URL } from "../constants/constants";

export const axiosInstance = (baseURL: string = `${FLASK_BASE_URL}/api`) => {
    return axios.create({
        baseURL,
    })
}