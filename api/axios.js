import axios from 'axios';
export const httpV1 = axios.create({
    baseURL: 'https://kibuthafc-server.onrender.com/api/',
    // baseURL:"http://localhost:9000/api/",
    headers: {
        'Content-Type': 'application/json',
    },
    });