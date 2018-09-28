import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import { timingSafeEqual } from 'crypto';

class ADS_Title extends React.Component {
  constructor(props) {
    super(props)
  }

  deleteItem() {
    this.props.delete(this.props.id);
  }

  static get defaultProps() {
    return {
      name: 'No Country'
    };
  }

  render() {
    let elem =
      <h1 className='test' style={{ backgroundColor: 'red' }}>
        <span>{this.props.name}</span>
        {
          this.props.list.map((item, index) => <span key={index}>{item}</span>)
        }
        <span>{this.props.children}</span>
        <button onClick={this.deleteItem.bind(this)}>delete</button>
      </h1>;
    return elem;
  }
}

class ADS_Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {
          name: 'USA',
          arr: ['Jason', 'Tom', 'Jerry'],
          text: 'xxxxx',
          id: uuid.v4()
        },
        {
          name: 'China',
          arr: ['Zhangsan', 'Lisi', 'Wangwu'],
          text: 'yyyy',
          id: uuid.v4()
        }
      ]
    };
  }

  addOneLine() {
    this.state.items.push({
      //name: 'UK',
      arr: ['B.Tim', 'G.Andy', 'C.Joe'],
      text: 'zzzz',
      id: uuid.v4()
    });
    this.forceUpdate();
  }

  deleteOneLine(id) {
    const idx = this.state.items.findIndex(item => item.id === id);
    this.state.items.splice(idx, 1);
    this.forceUpdate();
  }

  render() {
    let elem =
      <div>
        <div key={uuid.v4()}><button onClick={this.addOneLine.bind(this)}>addOneLine</button></div>
        {
          this.state.items.map(item =>
            <div key={item.id}>
              <ADS_Title id={item.id} name={item.name} list={item.arr} delete={this.deleteOneLine.bind(this)}>{item.text}</ADS_Title>
            </div>
          )
        }
      </div>;
    return elem;
  }
}

class ADS_Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      surInputValue: 'test value',
      surRadioValue: 'banana',
      inputValue: 'test value',
      surFruits: ['apple', 'grape']
    }
  }

  changeSurInput(event){
    this.state.surInputValue = event.target.value
  }

  changeInput(event){
    this.setState({
      inputValue: event.target.value
    });
  }

  surChangeRadioValue(event){
    this.state.surRadioValue = event.target.value
    console.log(`surChangeRadioValue is ${this.state.surRadioValue}`)
  }

  surChangeMultiValue(event){
    this.state.surFruits = event.target.value
    console.log(`surFruits is ${this.state.surFruits}`)
  }

  componentDidMount(){
    this.refs.supInput.focus()
  }

  render() {
    return <div>
      <form>
        <input type="text" defaultValue={this.state.surInputValue} onChange={this.changeSurInput.bind(this)}></input>
        <input type="checkbox" defaultChecked="true" value="fruits"></input>
        <input type="radio" name="blend" defaultChecked="true" value="apple"></input>
        <input type="radio" name="blend" value="banana"></input>
        <select defaultValue={this.state.surRadioValue} onChange={this.surChangeRadioValue.bind(this)}>
          <option value="apple">apple</option>
          <option value="orange">orange</option>
          <option value="banana">banana</option>
          <option value="grape">grape</option>
        </select>
        <select multiple defaultValue={this.state.surFruits} onChange={this.surChangeMultiValue.bind(this)}>
          <option value="apple">apple</option>
          <option value="orange">orange</option>
          <option value="banana">banana</option>
          <option value="grape">grape</option>
        </select>
      </form>
      <form>
        <input type="text"  ref="supInput" value={this.state.inputValue} onChange={this.changeInput.bind(this)}></input>
        <input type="checkbox" defaultChecked="true" value="fruits"></input>
        <input type="radio" name="blend" defaultChecked="true" value="apple"></input>
        <input type="radio" name="blend" value="banana"></input>
        <select defaultValue="banana">
          <option value="apple">apple</option>
          <option value="orange">orange</option>
          <option value="banana">banana</option>
          <option value="grape">grape</option>
        </select>
        <select multiple>
          <option value="apple">apple</option>
          <option value="orange" selected>orange</option>
          <option value="banana">banana</option>
          <option value="grape" selected>grape</option>
        </select>
      </form>
    </div>;
  }
}

ReactDOM.render(
  <div>
    <ADS_Container />
    <ADS_Form />
  </div>,
  document.querySelector('#root')
);

