import axios from "axios";

export const api = axios.create({
    baseURL: 'https://nlw-back-end-cn1j.onrender.com'
})