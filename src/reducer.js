const Redux = require('redux');

const reducer = function(state, action){
  if(action.type === 'changeName'){
    return Object.assign({}, state, {name: action.name});
  } else {
    return state;
  }
}

const store = Redux.createStore(reducer)

store.subscribe(() => console.log(store.getState()));

const action = {
  type: 'changeName', 
  name: 'zhangsan'
}

store.dispatch(action);