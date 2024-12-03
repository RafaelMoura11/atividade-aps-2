import axios from 'axios';

const api = axios.create({
  baseURL: "https://atividade-aps-2.onrender.com",
});

export default api;
