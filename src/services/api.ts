import axios from 'axios';

const api = axios.create({
  baseURL: 'https://myapi.com',
});

export default api;
