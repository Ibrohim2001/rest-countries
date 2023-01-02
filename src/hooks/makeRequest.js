import axios from "axios";

export const makeRequest = axios.create({
  baseURL: 'https://restcountries.com/v3.1'
});