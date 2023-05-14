import IHttpResponse from './IHttpResponse';

interface HttpClient {
  request: <Response>({
    query,
  }: {
    query: string;
  }) => Promise<IHttpResponse<Response>>;
}

export default HttpClient;
