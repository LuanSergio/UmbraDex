import { GraphQLClient } from 'graphql-request';

const graphqlClient = new GraphQLClient(
  'https://beta.pokeapi.co/graphql/v1beta',
);

export default graphqlClient;

// const apiUrl = 'https://beta.pokeapi.co/graphql/v1beta';

// const api = axios.create({
//   baseURL: apiUrl,
// });

// export { axios, api, apiUrl };
