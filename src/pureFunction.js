function pureFunction(state){
  //cannot change the state itself
  return {
    num: state.num + 1
  }
  //return state;
}

const newState = pureFunction({num: 2})

console.log(newState)