import { btoa } from './utils';
import Auth0 from 'react-native-auth0';
import credentials from '../auth0-credentials';

/*
* HTTP Client that works w/ `fetch` and jwts
*/
export default class HTTP {

  constructor({ base, mapping, clientToken, requestTimeout = 60000 }){
    if(!clientToken){
      console.error('Missing `clientToken`, you will not be able to authentcate. Check constructor.');
    }
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
    this.clientToken = btoa(clientToken);
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
    this.jwt = credentials.accessToken;
    return credentials;
  }

  tokenHeaders = () => {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Basic ${ this.clientToken }`
    };
  }

  authorizedHeaders = () => {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      //authorization: `Bearer ${ this.jwt.accessToken }`
    };
  }

  constructUrl = (requestType, opts = {}) => {
    console.log(opts);
    return `${ this.base }${ opts.base || this.mapping[requestType] || this.mapping.base }`;
  }

  urlParams = (params) => {
    return (
      Object.keys(params).map((key) => `&${key}=${params[key]}`).join('')
    )
  }

  isAuthenticated = () => {
    return !!this.jwt.accessToken;
  }

  logout = () => {
    return new Promise((resolve, reject) => {
      this.jwt = undefined;
      resolve(true);
    });
  }

  // Check token against pinging endpoint
  status = (jwt) => {
    console.debug('=== STATUS', jwt);
    if(!jwt){
      return Promise.reject(new Error('jwt was undefined.'))
    }
    return (
      this.request(this.constructUrl('status'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          authorization: `Bearer ${ jwt.accessToken }`
        }
      })
      .then(this.setJwt.bind(this, jwt))
    );
  }

  authenticate = () => {
    return (
      this.auth0.webAuth
        .authorize({
          scope: 'openid profile',
          audience: 'https://' + credentials.domain + '/userinfo'
        })
        .then(this.setJwt)
      );
  }

  get = (action, params, opts) => {
    console.debug('=== GET', action, params, opts, `${this.constructUrl('get', opts)}/${action}`);
    return (
      this.request(`${this.constructUrl('get', opts)}/${action}`, {
        method: 'POST',
        headers: this.authorizedHeaders(),
        body: JSON.stringify({
          action,
          ...params
        })
      })
    );
  }

  put = () => {
    console.error('TODO: Implement');
  }

  delete = () => {
    console.error('TODO: Implement');
  }

  query = () => {
    console.error('TODO: Implement');
  }

}
