import axios from 'axios';
export const baseURL = 'http://192.168.43.116:3000';
const API = axios.create({
  baseURL: baseURL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
npx