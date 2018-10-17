import React from 'react'
import Actions from './Actions'
import Store from './Store'

const store = new Store();
const actions = new Actions(store);

class View extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      list: [],
      currentText: ''
    }
  }

  _init(){
    actions.addAction({
      type: 'init'
    });
  }

  componentDidMount(){
    this._init();

    store.on('init', () => {
      this.setState({
        list: store.list
      })
    })

    store.on('change', () => {
      this.setState({
        list: store.list
      })
    })
  }

  add(){
    if(this.refs.currentText.value !== ''){
      actions.addAction({
        type: 'add',
        value: this.refs.currentText.value
      });
    }
  }

  changeText(event){
    this.state.currentText = event.target.value
  }

  render(){
    const elem =
      <div>
        <ul>
          {this.state.list.map((item, index) => (<li key={index}>{item}</li>) )}
        </ul>
        <div>
          <input ref="currentText"/>
          <button onClick={this.add.bind(this)}>add</button>
        </div>
      </div> ;
    return elem;
  }

}

export default View;