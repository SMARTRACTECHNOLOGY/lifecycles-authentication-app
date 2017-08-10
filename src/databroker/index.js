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

  constructor(type, base){
    this.type = type || 'http';
    this.base = base || '/';
    this.backend = this._configure();
  }

  /*
  * Given the `type` set up the infrastructure for requests of that type and base
  */
  _configure = () => {
    switch(this.type){
      case 'http':
        return new HTTP(this.base);
      default:
        console.warn('No backend support for type:', this.type);
    }
  }

  // Public API

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

}

export default Databroker;
