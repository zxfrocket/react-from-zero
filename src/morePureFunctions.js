 //the initial state
let state = {
  aaa: {name: 'leo'},
  bbb: {group: 'javascript'},
  ccc: {age: 23}
}

function update(updaters, state){
  const newState = {};

  const keys = Object.keys(updaters);
  keys.forEach( key => {
    const updater = updaters[key] // updater pure function
    const value = state[key];
    const newSubstate = updater(value);
    newState[key] = newSubstate;
  });

  const ret = Object.assign({}, state, newState);
  console.log(ret);
}

function aaaUpdate(subState){
  return {name: 'liangzeng'};
}

function bbbUpdate(subState){
  return {group: 'nodejs'};
}

update({
  aaa: aaaUpdate,
  bbb: bbbUpdate
}, state)