import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import utils from 'flux/utils'
import AppStore from './AppStore'
import dispatcher from './globalDispatcher'

const Container = utils.Container
const store = new AppStore(dispatcher)

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      count: 0
    }
    
  }

  static getStores(){
    return [store]
  }

  static calculateState(oldState){
    return {
      count: store.getState().count
    }
  }

  /**
   * Container has done these two functions innerally
   */
  // componentDidMount(){
  //   this.lister = this.store.addListener(() => {
  //     this.setState({
  //       count: this.store.getState().count
  //     })
  //   })
  // }

  // componentWillUnmount(){
  //   this.lister();
  // }

  onSendMsg(){
    dispatcher.dispatch({
      type: 'send'
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Facebook Flux</h1>
          <button onClick={this.onSendMsg.bind(this)}>I was clicked {this.state.count} times</button>
        </header>
      </div>
    )
  }
}

const AppUI = Container.create(App, {pure: false})

export default AppUI
