import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;
const request = axios.create({
  baseURL: 'http://localhost:8000/',
});
export const makeRequest = async (apiConfig) => {
  const  response = await request(apiConfig);
  return response.data;
};
export default request;