import React from 'react'
import ReactDOM from 'react-dom'
import uuid from 'uuid'

class BIG extends React.Component{
  constructor(){
    super()
    this.state = {
      inputValue: 'no samll click',
      items: ['AAA','BBB','CCC','DDD'],
    }
  }

  clickBigBtn(item){
    this.setState({
      currentItem: item
    })
  }

  receiveSmallBtn(samllItem){
    this.setState({
      inputValue: samllItem
    })
  }

  render(){
    const elem = 
    <div>
      <div>
        {this.state.items.map(item => (<button key={item} onClick={this.clickBigBtn.bind(this, item)} id={item}>{item}</button>))}
      </div>
      <div>
        <form>
          <input readOnly type="text" value={this.state.inputValue}></input>
        </form>
      </div>
      <div>
        <SMALL bigItem={this.state.currentItem} itemChange={this.receiveSmallBtn.bind(this)}></SMALL>
      </div>
    </div>
    return elem
  }
}

class SMALL extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      items: ['111','222','333','444'],
    }
  }

  static get defaultProps(){
    return {
      bigItem: 'no big click'
    }
  }

  render(){
    const elem = 
    <div>
      <div>
        {this.state.items.map(item => (<button key={item} id={item} onClick={this.props.itemChange.bind(this, item)}>{item}</button>))}
      </div>
      <div>
        <form>
          <input readOnly type="text" value={this.props.bigItem}></input>
        </form>
      </div>
    </div>
    return elem
  }
}

ReactDOM.render(
  <div>
    <BIG>
    </BIG>
  </div>,
  document.querySelector('#root')
);

