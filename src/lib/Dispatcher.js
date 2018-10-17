export default {
  
  _callbackList: [],
  _middlewares: [],

  use(middleCallback){
    this._middlewares.push(middleCallback);
    return this;
  },

  register(storeCallback){
    this._callbackList.push(storeCallback)
  },

  dispatch(action){
    let index = 0;

    const next = () => {
      if(this._middlewares[index]){
        this._middlewares[index++](action, next);
      }
      else{
        this._callbackList.forEach((cb) => cb(action))
      }
    }

    next();
    
  }

};