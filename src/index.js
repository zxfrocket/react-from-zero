import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import {CSSTransition} from 'react-transition-group';

const ADS_Title = React.createClass({
  deleteItem(){
    this.props.delete(this.props.id);
  },

  getDefaultProps(){
    return {
      name: 'No Country'
    }
  },

  render() {
    let elem =
      <h1 className='test' style={{ backgroundColor: 'red' }}>
        <span>{this.props.name}</span>
        {
          this.props.list.map((item, index) => <span key={index}>{item}</span>)
        }
        <span>{this.props.children}</span>
        <button onClick={this.deleteItem}>delete</button>
      </h1>;
    return elem;
  }
});

const ADS_Container = React.createClass({
  getInitialState() {
    return {
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
      ],
      newLine: false
    }
  },

  addOneLine(){
    this.state.items.push({
      //name: 'UK',
      arr: ['B.Tim', 'G.Andy', 'C.Joe'],
      text: 'zzzz',
      id: uuid.v4()
    });
    this.newLine = true;
    this.setState({
      newLine: true
    });
  },

  deleteOneLine(id){
    const idx = this.state.items.findIndex(item => item.id === id);
    this.state.items.splice(idx, 1);
    this.forceUpdate();
  },

  render() {
    let elem =
      <div>
        <div key={uuid.v4()}><button onClick={this.addOneLine}>addOneLine</button></div>
        {
          this.state.items.map(item =>
            <div key={item.id}>
              <CSSTransition in={this.state.newLine} timeout={500} classNames="line" onExited={() => {
                this.setState({
                  newLine: false,
                });
              }}>
                <ADS_Title key={item.id} id={item.id} name={item.name} list={item.arr} delete={this.deleteOneLine}>{item.text}</ADS_Title>
              </CSSTransition>
            </div>
          )
        }
      </div>;
    return elem;
  }
});

ReactDOM.render(
  <ADS_Container />,
  document.querySelector('#root')
);

