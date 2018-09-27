import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';

class ADS_Title extends React.Component{
  constructor(props){
    super(props)
  }

  deleteItem(){
    this.props.delete(this.props.id);
  }

  static defaultProps(){
    return {
      name: 'No Country'
    }
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

class ADS_Container extends React.Component{
  constructor(props){
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

  addOneLine(){
    this.state.items.push({
      //name: 'UK',
      arr: ['B.Tim', 'G.Andy', 'C.Joe'],
      text: 'zzzz',
      id: uuid.v4()
    });
    this.forceUpdate();
  }

  deleteOneLine(id){
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

ReactDOM.render(
  <ADS_Container />,
  document.querySelector('#root')
);

