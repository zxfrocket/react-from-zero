import React from 'react';
import uuid from 'uuid';
import ADS_Title from './ADS_Title';

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
              <ADS_Title key={item.id} id={item.id} name={item.name} list={item.arr} delete={this.deleteOneLine}>{item.text}</ADS_Title>
            </div>
          )
        }
      </div>;
    return elem;
  }
});

export default ADS_Container;
