import axios from 'axios';

const apiUrl = 'https://pokeapi.co/api/v2/';

const api = axios.create({
  baseURL: apiUrl,
});

export { apiUrl, api };
