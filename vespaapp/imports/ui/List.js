import React from 'react';
import ReactDOM from 'react-dom';

import DataItem from './DataItem.js';

import { Mars } from '../api/data.js';

class List extends React.Component {
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Mars.insert({
      name: text,
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <div id="list" className="container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input style={{"width":"100%"}}
            type="text"
            ref="textInput"
            placeholder="Type to add new entries"
          />
        </form>
        <ul>
          {this.renderItems()}
        </ul>
      </div>
    );
  }

  renderItems() {
    // let DataItems = [
    //   { _key:"key-0", text: "item 1" },
    //   { _key:"key-1", text: "item 2" },
    //   { _key:"key-2", text: "item 3" },
    //   { _key:"key-3", text: "item 4" },
    //   { _key:"key-4", text: "item 5" }
    // ]

    // return DataItems.map((item) => {
    //   return (
    //     <DataItem key={item._key} text={item.text}/>
    //   )
    // });

    let DataItems = this.props.dataPoints;
    return DataItems.map((item) => {
      return (
        <DataItem key={item._id} text={item.name}/>
      )
    });
  }
}
export default List;
