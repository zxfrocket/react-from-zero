import { createStore, useMiddleware } from './index'


const logger = store => next => action => {
  console.log('begin logger', action)
  next.call(store, action) //next here is ajaxData function
  console.log('end logger', action)
}

// const logger = function(store){
//   return function(next){
//     return function(action){
//       console.log('begin logger', action)
//       next.call(store, action) //next here is ajaxData function
//       console.log('end logger', action)
//     }
//   }
// }

//async
const ajaxData = store => next => action => {
  setTimeout(() => {
    console.log('begin ajaxData', action)
    next.call(store, action) // next here is store's listen function
    console.log('end ajaxData', action)
  }, 1000)//next here is ajaxData function
}

const store = createStore(function (state, action) {
  if (action.type === 'changeName') {
    return {
      name: action.name
    }
  }
  else {
    return state;
  }
}, { name: 'leo' });

useMiddleware(store, [logger, ajaxData])

store.listen(() => {
  console.log(store.state);
})

store.dispatch({
  type: 'changeName',
  name: 'zhangsan'
})


