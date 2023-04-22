import HttpStatusCode from './HttpStatusCode';

interface IHttpResponse<Body> {
  statusCode: HttpStatusCode;
  body: Body;
}

export default IHttpResponse;
