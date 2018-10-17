
import Dispatcher from './Dispatcher'
import ee from 'events'

class Store extends ee.EventEmitter{
  constructor(){
    super()
    this._list = [];

    Dispatcher.register(({type, value}) => {
      switch(type){
        case 'add':
          this._add(value);
        break;
        case 'init':
          this._init(value);
        break;
      }
    })
  }

  _init(list){
    this._list = list;
    this.emit('init');
  }

  _add(item) {
    this._list.push(item);
    this.emit('change');
  }

  get list(){
    return this._list;
  }

}

export default Store;