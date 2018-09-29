import React from 'react';
import uuid from 'uuid';

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

export default ADS_Title;