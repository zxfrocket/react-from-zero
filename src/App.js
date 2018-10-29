import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
const Reflux = require('reflux')

class App extends Component {
  componentDidMount(){
    const action = Reflux.createAction(
      {
        click(){
          action.trigger('self way')
        },
        preEmit(data){
          return 'preEmit-' + data 
        },
        shouldEmit(data){
          return true
        }
      }
    )

    //action.listen(data => console.log(`this is log 1 ${data}`))
    action.listen(data => console.log(`this is log 2 ${data}`))

    action.trigger('sync way')

    action.triggerAsync('async way')

    action('defaut way')

    action.click()

    console.log('------------end---------------')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
