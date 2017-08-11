import { btoa } from './utils';

/*
* HTTP Client that works w/ `fetch` and jwts
*/
export default class HTTP {

  constructor({ base, mapping, clientToken, requestTimeout = 60000 }){
    if(!clientToken){
      console.error('Missing `clientToken`, you will not be able to authentcate. Check constructor.');
    }
    this.base = base;
    this.mapping = mapping;
    this.requestTimeout = requestTimeout;
    this.jwt = undefined;
    this.errorCodes = {
      400: 'Bad Request',
      401: 'Unauthorized',
      500: 'Internal Server Error'
    };
    this.clientToken = btoa(clientToken);
  }

  checkStatus = (response) => {
    const status = response.status;
    if(status >= 200 && status < 300) {
      return response[status == 204 ? "text" : "json"](); // eslint-disable-line eqeqeq
    } else if(status === 401){
      // Set token undefined if `Unauthorized`
      this.jwt = undefined;
      throw new Error(this.errorCodes[status]);
    } else if(status === 400){
      return (
        response.json()
          .then(({ errors }) => {
            const error = new Error(this.errorCodes[status]);
            error.code = 401;
            error.response = response;
            throw error;
          })
      );
    } else {
      // 500 errors
      const error = new Error(response.statusText);
      error.code = 500;
      error.response = response;
      throw error;
    }
  }

  timedRequest(ms, promise){
    return (
      new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Request Timeout'));
        }, ms);
        const handleResolution = (res) => {
          clearTimeout(timeoutId);
          resolve(res);
        };
        const handleRejection = (err) => {
          clearTimeout(timeoutId);
          reject(err);
        };
        promise.then(handleResolution, handleRejection);
      })
    );
  }

  request = (url, options) => {
    return (
      this.timedRequest(this.requestTimeout, fetch(url, options))
        .then(this.checkStatus)
    );
  }

  constructUrl = (requestType) => {
    return `${ this.base }${ this.mapping[requestType] }`
  }

  urlParams = (params) => {
    return (
      Object.keys(params).map((key) => `&${key}=${params[key]}`).join('')
    )
  }

  isAuthenticated = () => {
    return !!this.jwt.access_token;
  }

  logout = () => {
    return new Promise(function(resolve, reject) {
      this.jwt = undefined;
      resolve(true);
    });
  }

  authenticateToken = (jwt) => {
    return new Promise(function(resolve, reject) {
      this.jwt = jwt;
      resolve(true);
    });
  }

  authenticate = (username, password) => {
    const params = {
      username: encodeURIComponent(username),
      password: encodeURIComponent(password)
    };
    return (
      this.request(`${ this.constructUrl('authenticate') }${ this.urlParams(params) }`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          authorization: `Basic ${ this.clientToken }`
        }
      })
      .then((jwt) => {
        // Store jwt internally to use for future requests
        this.jwt = jwt;
        return jwt;
      })
    );
  }

  get = () => {
    console.log('calling http get method', this.meta);
  }

  put = () => {
    console.log('calling http put method', this.meta);
  }

  delete = () => {
    console.log('calling http delete method', this.meta);
  }

  query = () => {
    console.log('calling http query method', this.meta);
  }

}
