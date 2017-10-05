import { btoa } from './utils';
import Auth0 from 'react-native-auth0';
import credentials from '../auth0-credentials';
import jwtDecode from 'jwt-decode';

/*
* HTTP Client that works w/ `fetch` and jwts
*/
export default class HTTP {

  constructor({ base, mapping, requestTimeout = 60000 }){
    this.auth0 = new Auth0(credentials);
    this.base = base;
    this.mapping = mapping;
    this.requestTimeout = requestTimeout;
    this.jwt = undefined;
    this.errorCodes = {
      400: 'Bad Request',
      401: 'Unauthorized',
      500: 'Internal Server Error'
    };
  }

  checkStatus = (response) => {
    const status = response.status;
    if(status >= 200 && status < 300) {
      return response[status == 204 ? "text" : "json"]();
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

  setJwt = (credentials) => {
    this.jwt = credentials.idToken;
    return this.jwt;
  }

  authorizedHeaders = () => {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${ this.jwt }`
    };
  }

  createQueryParams = (params) => {
    return (
      Object.keys(params).map(key => {
        return `${ key }=${ params[key] }`;
      })
      .join('&')
    );
  }

  constructUrl = (requestType, action, params = {}, opts = {}) => {
    return `${ this.base }/${ this.mapping.base }/${ action }`;
  }

  constructQueryParamUrl = (requestType, action, params = {}, opts = {}) => {
    return `${ this.constructUrl(requestType, action, params, opts) }?${ this.createQueryParams(params)}`;
  }

  urlParams = (params) => {
    return Object.keys(params).map((key) => `&${key}=${params[key]}`).join('');
  }

  /*
  * Returns a decoded jwt for the http
  */
  context = () => {
    return jwtDecode(this.jwt);
  }

  isAuthenticated = () => {
    return !!this.jwt;
  }

  logout = () => {
    return new Promise((resolve, reject) => {
      this.jwt = undefined;
      resolve(true);
    });
  }

  // Check token against pinging endpoint
  status = (jwt) => {
    if(!jwt){
      return Promise.reject(new Error('jwt was undefined.'))
    }
    // Eventually make a call to an endpoint that will validate the token as valid
    this.setJwt({ idToken: jwt });
    return Promise.resolve();
  }

  authenticate = () => {
    console.debug('=== AUTHENTICATE', credentials.domain);
    return (
      this.auth0.webAuth
        .authorize({
          scope: 'openid profile email',
          audience: 'https://' + credentials.domain + '/userinfo'
        })
        .then(this.setJwt)
      );
  }

  get = (action, params, opts) => {
    console.debug('=== GET', action, params, opts, this.constructQueryParamUrl('get', action, params, opts));
    return (
      this.request(this.constructQueryParamUrl('get', action, params, opts), {
        method: 'GET',
        headers: this.authorizedHeaders()
      })
    );
  }

  put = (action, params, opts) => {
    console.debug('=== PUT', action, params, opts, this.constructUrl('put', action, params, opts));
    return (
      this.request(this.constructUrl('put', action, params, opts), {
        method: 'PUT',
        headers: this.authorizedHeaders(),
        body: JSON.stringify(params)
      })
    );
  }

  delete = () => {
    console.error('TODO: Implement');
  }

  query = () => {
    console.error('TODO: Implement');
  }

}
