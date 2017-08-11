import { HTTP } from './backends';

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
  authenticateToken(token){
    return this.backend.authenticateToken(token);
  }

  authenticate(username, password){
    return this.backend.authenticate(username, password);
  }

  get(params){
    return this.backend.get(params);
  }

  put(params){
    return this.backend.put(params);
  }

  delete(id){
    return this.backend.delete(id);
  }

  query(term){
    return this.backend.query(term);
  }

  logout(){
    return this.backend.logout();
  }

}

export default Databroker;
