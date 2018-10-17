
import Dispatcher from './Dispatcher'
import WebAPI from './WebAPI'

class Actions{

  addAction({type, value}){
    switch(type){
      case 'init':
      WebAPI.getAll((list) => {
        Dispatcher.dispatch({type, value: list});
      })
      break;
      case 'add':
      Dispatcher.dispatch({type, value});
      break;
    }
  }

}

export default Actions;