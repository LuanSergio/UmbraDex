import IHttpResponse from './IHttpResponse';

interface IHttpClient {
  request: <Response>({
    query,
  }: {
    query: string;
  }) => Promise<IHttpResponse<Response>>;
}

export default IHttpClient;
