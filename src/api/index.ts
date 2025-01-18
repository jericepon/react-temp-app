import axios from 'axios';

const API = axios.create({
  baseURL: 'https://some-domain.com/api/',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default API