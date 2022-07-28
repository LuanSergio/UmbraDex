import { GraphQLClient } from 'graphql-request';

const graphqlClient = new GraphQLClient(
  'https://beta.pokeapi.co/graphql/v1beta',
);

export default graphqlClient;
