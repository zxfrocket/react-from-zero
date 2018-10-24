import utils from 'flux/utils'

class AppStore extends utils.ReduceStore {
  constructor(dispatcher){
    super(dispatcher)
  }

  getInitialState(){
    return {
      count: 0
    }
  }

  reduce(oldState, action){
    const newState = {
      count: oldState.count
    }
    switch(action.type){
      case 'send':
        ++newState.count
        this.__changed = true
      break
    }
    return newState
  }

  areEqual(oldState, newState){
    return oldState.count === newState.count;
  }

  /**
   * This function is used by Store
   */
  // __onDispatch(action){
  //   switch(action.type){
  //     case 'send':
  //       ++this.count
  //       this.__changed = true
  //     break
  //   }
  // }

}
export default AppStore
