import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
const Reflux = require('reflux')

const action1 =
{
  click() {
    this.trigger('self way')
  },
  preEmit(data) {
    return 'preEmit-' + data
  },
  shouldEmit(data) {
    return true
  }
}

const action2 =
{
  asyncResult: true,
  children: ['clickme']
}

const actions = Reflux.createActions({ action1, action2 })

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

actions.action2.trigger('sync result1')

console.log('------------end---------------')

//===================================for store=================================
const action = Reflux.createAction()
const store = Reflux.createStore({

  listenables: actions,

  init() {
    this.data = { count: 0 }
    this.listenTo(action, this.onClick)
    //this.listenToMany(actions)
  },

  onClick(type) {
    if (type === 'clickme') {
      ++this.data.count
      this.trigger(this.data)
    }
  },

  onClickAlways() {
    ++this.data.count
    this.trigger(this.data)
  },

  onAction1() {
    console.log(`onAction1`)
  },

  onAction2() {
    console.log(`onAconAction2tion1`)
  },

  onAction2Completed() {
    console.log(`onAction2Completed`)
  },

  onAction2Failed() {
    console.log(`onAction2Failed`)
  },

  onAction2Clickme() {
    console.log(`onAction2Clickme`)
  },
})

store.listen((data) => {
  console.log(`on Click ${data.count} times`)
})

action.trigger('clickme')
action.trigger('clickme')
action.trigger('others')

class App extends Component {
  constructor(){
    super()
    this.state = {
      num: 0
    }
  }

  componentDidMount() {
    this.listenFun = store.listenTo(action, this.onAction.bind(this))
  }

  componentWillUnmount() {
    this.listenFun()
  }

  onAction(){
    this.setState({
      num: ++this.state.num
    })
  }

  onAddOneTime(){
    action.trigger('clickme')
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
        <div>
          <button onClick={this.onAddOneTime.bind(this)}>Add one time</button>
          <label>{this.state.num}</label>
        </div>
      </div>
    )
  }
}

export default App
