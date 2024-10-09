import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7387/api',
});

export default api;