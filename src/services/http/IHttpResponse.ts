import HttpStatusCode from './HttpStatusCode';

interface HttpResponse<Body> {
  statusCode: HttpStatusCode;
  body: Body;
}

export default HttpResponse;
