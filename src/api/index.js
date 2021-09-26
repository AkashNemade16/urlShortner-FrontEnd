import axios from 'axios';


const API = axios.create({ baseURL: 'https://tinyurl-mern.herokuapp.com' })

export const fetchUrl = () => API.get('/get');
export const createUrl = (newUrl) => API.post('/create', newUrl);
export const fetchUserUrls = (email) => API.post('/users', email)
