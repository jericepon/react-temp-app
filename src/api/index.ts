import axios from 'axios';

const API = axios.create({
  baseURL: 'https://react-fast-pizza-api.jonas.io/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default API