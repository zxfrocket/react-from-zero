const Redux = require('redux')
const createStore = Redux.createStore
const combineReducers = Redux.combineReducers

// state -> {a: [], b}
// action A -> {type, data(String)
//const reducers = {  a: function (state, action) { }, b: function (state, action) { }}

function aReducer(state, action) {
  if( !state ) return [];
  switch (action.type) {
    case 'a':
      return state.concat([action.data])
    default:
      return state
  }
}

function bReducer(state, action) {
  if( !state ) return [];
  switch (action.type) {
    case 'b':
      return state.concat([action.data])
    default:
      return state
  }
}

const reducers = combineReducers({a: aReducer, b: bReducer});

const store = createStore(reducers, {a: [111], b: [222]})

store.subscribe(() => {
  console.log(store.getState())
} )

let action = {
  type: 'a',
  data: 'leo'
}

store.dispatch(action)