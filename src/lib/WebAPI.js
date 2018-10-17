
class WebAPI{

  static getAll(callback){
    setTimeout(() => {
      callback(['initial data 1', 'initial data 2', 'initial data 3']);
    }, 1000)
  }

}

export default WebAPI;