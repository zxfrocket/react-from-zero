import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
const Reflux = require('reflux')

class App extends Component {
  componentDidMount(){
    const action1 = 
      {
        click(){
          this.trigger('self way')
        },
        preEmit(data){
          return 'preEmit-' + data 
        },
        shouldEmit(data){
          return true
        }
      }

    const action2 = 
      {
        asyncResult: true,
        children: ['clickme']
      }

    const actions = Reflux.createActions({action1, action2})

    //action.listen(data => console.log(`this is log 1 ${data}`))
    actions.action1.listen(data => console.log(`this is log 2 ${data}`))

    actions.action1.trigger('sync way')

    actions.action1.triggerAsync('async way')

    actions.action1.click()

    //for async result
    actions.action2.listen(data => {
      console.log('async result yes' + data)
      setTimeout(() => {
        actions.action2.completed();
      }, 200)
    })
    
    actions.action2.listen(data => {
      console.log('async result no' + data)
      setTimeout(() => {
        actions.action2.failed();
      }, 200)
    })
    
    actions.action2.listen(data => {
      console.log('async result self' + data)
      setTimeout(() => {
        actions.action2.clickme();
      }, 200)
    })

    actions.action2.completed.listen(() => {
      console.log('complete')
    })

    actions.action2.failed.listen(() => {
      console.log('failed')
    })

    actions.action2.clickme.listen(() => {
      console.log('clickme')
    })

    actions.action2.trigger('sync result')

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
