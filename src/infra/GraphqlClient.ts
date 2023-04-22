import { GraphQLClient } from 'graphql-request';

import IHttpClient from '@services/http/IHttpClient';
import IHttpResponse from '@services/http/IHttpResponse';

class GraphqlClient implements IHttpClient {
  private readonly client = new GraphQLClient(
    'https://beta.pokeapi.co/graphql/v1beta',
  );

  async request<Response>({
    query,
  }: {
    query: string;
  }): Promise<IHttpResponse<Response>> {
    try {
      const data = await this.client.request(query);
      return {
        statusCode: 200,
        body: data,
      };
    } catch (error) {
      return {
        statusCode: error.response.status,
        body: error.response.data,
      };
    }
  }
}

export default GraphqlClient;
