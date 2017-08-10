import Core from './core';

export default class HTTP extends Core {

  constructor(){
    super();
    this.meta = {
      token: undefined
    };
  }

  authenticate(username, password){
    return new Promise((resolve, reject) => {
      const session = {
        access_token: 'some_token_i_will_use'
      };
      // Add meta data to http object and resolve
      this.meta = session;
      setTimeout(() => {
        resolve(session);
      }, 1500);
    });
  }

  get(){
    console.log('calling http get method', this.meta);
  }

  put(){
    console.log('calling http put method', this.meta);
  }

  delete(){
    console.log('calling http delete method', this.meta);
  }

  query(){
    console.log('calling http query method', this.meta);
  }

}
