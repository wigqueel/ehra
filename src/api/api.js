import Axios from "axios";

// Axios.defaults.withCredentials = true;

export const api = Axios.create({
    baseURL: 'https://admin.admiral-studios.com/',
    withCredentials: true,
})

