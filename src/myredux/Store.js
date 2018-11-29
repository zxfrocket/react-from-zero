const EventEmitter = require('events').EventEmitter;
class Store {
  constructor(state) {
    this._state = state || {};
    this._updates = {};
    this._emitter = new EventEmitter();
  }

  get state() {
    return JSON.parse(JSON.stringify(this._state));
  }

  //fns = function or object = multi-update
  setUpdates(fns) {
    this._updates = fns;
  }

  //action
  dispatch(action) {

    if (typeof this._updates === 'function') {
      this._state = this._updates(this._state, action);//return new state
    }
    else {
      const newState = {};

      const keys = Object.keys(this._updates);
      keys.forEach(key => {
        const updater = this._updates[key] // updater pure function
        const value = this._state[key];
        const newSubstate = updater(value, action);
        newState[key] = newSubstate;
      });

      this._state = Object.assign({}, this._state, newState);
    }

    this._emitter.emit('change')
  }

  //add listener
  listen(listener) {
    this._emitter.on('change', listener)
  }
}

export default Store;