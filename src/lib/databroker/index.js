import { HTTP } from './backends';
import Auth0 from 'react-native-auth0';
import credentials from './auth0-credentials';

/*
* The databroker is a promise based data abstraction which provides an interface to
* interface w/ any type of backend service like http, websockets, or localStorage.
*/

/*
* API Definition
*
* `type` - One of `http`, `websocket`, `localStorage`
*  Note: Only `http` is implemented
*
* `host` - This is the base url of the service by default uses '/'
*
*/

class Databroker {

  constructor(opts){
    this.opts = opts;
    this.auth0 = new Auth0(credentials);
    this.backend = this.configure();
  }

  /*
  * Given the `type` set up the infrastructure for requests of that type and base
  */
  configure = () => {
    switch(this.opts.type){
      case 'http':
        return new HTTP(this.opts);
      default:
        console.warn('No backend support for type:', this.opts.type);
    }
  }

  // Public API
  status(token){
    return this.backend.status(token);
  }

  authByAuth0() {
    return this.auth0.webAuth
            .authorize({
              scope: 'openid profile',
              audience: 'https://' + credentials.domain + '/userinfo'
            })
  }

  get(action, params, opts){
    return this.backend.get(action, params, opts);
  }

  put(params, opts){
    return this.backend.put(params, opts);
  }

  delete(id, opts){
    return this.backend.delete(id, opts);
  }

  query(term, opts){
    return this.backend.query(term, opts);
  }

  logout(){
    return this.backend.logout();
  }

}

export default Databroker;
