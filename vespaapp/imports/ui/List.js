import React from 'react';

import DataItem from './DataItem.js';

class List extends React.Component {
  renderItems() {

    let DataItems = [
      { _key:"key-0", text: "item 1" },
      { _key:"key-1", text: "item 2" },
      { _key:"key-2", text: "item 3" },
      { _key:"key-3", text: "item 4" },
      { _key:"key-4", text: "item 5" }
    ]

    return DataItems.map((item) => {
      return (
        <li key={item._key}>
          <p>{item.text}</p>
          // <DataItem key={item.i} data={item.text}/>
        </li>
      );
    });
  }

  render() {
    return (
      <div id="list">
        <ul>
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}
export default List;
