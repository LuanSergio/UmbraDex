import axios from 'axios';

const apiUrl = 'https://beta.pokeapi.co/graphql/v1beta';

const api = axios.create({
  baseURL: apiUrl,
});

export { axios, api, apiUrl };
