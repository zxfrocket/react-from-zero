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

function createStore(updaters, defaultState) {
  const store = new Store(defaultState);
  store.setUpdates(updaters);
  return store;
}

const store = createStore({
  name: nameUpdater,
  num: numberUpdater
}, { name: 'leo', num: 5 });

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

function nameUpdater(oldName, action) {
  if (action.type === 'changeName') {
    return action.name;
  }
  return oldName;
}


store.listen(() => {
  console.log('store listen', store.state)
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

// console.log('begin', action3.type)
// store.dispatch(action)
// store.dispatch(action2)
// store.dispatch(action3)
// console.log('end', action3.type)

//store output is store.listen
//store input is store.setUpdates
//store trigger is store.dispatch

function logger(store) {
  let next = store.dispatch;

  store.dispatch = (action) => {
    console.log('begin logger', action)
    action.name = 'logger';
    next.call(store, action) //next here is ajaxData function
    console.log('end logger', action)
  };

  return store;
}

//async
function ajaxData(store) {
  let next = store.dispatch;

  store.dispatch = (action) => {
    if (action.url) {
      setTimeout(() => {
        console.log('begin ajaxData', action)
        next.call(store, action) // next here is store's listen function
        console.log('end ajaxData', action)
      }, 1000)
    } else {
      next.call(store, action)
      console.log('never run')
    }
  };

  return store;

}

function useMiddleware(store, middles) {
  middles.reverse();
  middles.forEach((middle) => {
    middle(store);
  });
  return store;
}

useMiddleware(store, [logger, ajaxData]);

store.dispatch({type: 'changeName', url: '////'})

//middleware means fetch the store and action then change them before run store.listener, 