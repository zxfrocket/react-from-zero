import React from 'react';
import ReactDOM from 'react-dom';

const ADS_Title = React.createClass({
  render() {
    let elem =
      <h1 className='test' style={{ backgroundColor: 'red' }}>
        <span>{this.props.name}</span>
        {
          this.props.list.map((item, index) => <span key={index}>{item}</span>)
        }
        <span>{this.props.children}</span>
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
          text: 'xxxxx'
        },
        {
          name: 'China',
          arr: ['Zhangsan', 'Lisi', 'Wangwu'],
          text: 'yyyy'
        }
      ]
    }
  },

  render() {
    let elem =
      <div>
        {
          this.state.items.map(item =>
            <div>
              <ADS_Title name={item.name} list={item.arr}>{item.text}</ADS_Title>
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
// {
//   tagName: 'h1',
//   attr: null,
//   children: ['hello']
// }
// ReactDOM.render(
//   React.createElement('h1', null, ['hello']),
//   document.querySelector('#root')
// )

//console.log(<h1>hello</h1>);
