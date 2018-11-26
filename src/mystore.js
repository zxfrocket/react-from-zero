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

const store = new Store({ name: 'leo', num: 5 });


function numberUpdater(oldNum, action) {
  let newNum = oldNum;
  switch (action.type) {
    case '+':
      newNum = ++oldNum;
      break;
    case '-':
      newNum = oldNum;
      break;
  }
  return newNum;
}

function nameUpdater(oldName, action){
  if(action.type === 'changeName'){
    return action.name;
  }
  return oldName;
}

store.setUpdates({
  name: nameUpdater,
  num: numberUpdater
});

store.listen(() => {
  console.log(store.state)
})

const action = {
  type: '+'
}

const action2 = {
  type: '-'
}

const action3 = {
  type: 'changeName',
  name: 'zhangsan'
}

store.dispatch(action)
store.dispatch(action2)
store.dispatch(action3)

//store output is store.listen
//store input is store.setUpdates
//store trigger is store.dispatch