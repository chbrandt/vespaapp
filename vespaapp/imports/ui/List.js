import React from 'react';
import ReactDOM from 'react-dom';

import DataItem from './DataItem.js';

import { Mars } from '../api/data.js';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      items: []
    }
  }

  render() {
    return (
      <div id="list" className="container">

        <form>
          <input
            placeholder="Type to filter entries"
            style={{"width":"100%"}}
            type="text"
            onChange={this.filterList.bind(this)}
          />
        </form>

        <ul>
          {this.renderItems()}
        </ul>
      </div>
    );
  }

  renderItems() {
    // hack to work around empty list at the very beginning
    var DataItems = !(this.state.query || this.state.items.length)
                    ? this.props.dataPoints
                    : this.state.items;
    return DataItems.map((item) => {
      return (
        <DataItem key={item._id} text={item.name}/>
      )
    });
  }

  filterList(event) {
    this.setState({ query: event.target.value });
    var filteredList;
    if (this.state.query) {
      filteredList = this.state.items;
      filteredList = filteredList.filter((item) => {
        return item.name.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1;
      });
    } else {
      filteredList = this.props.dataPoints;
    }
    this.setState({items: filteredList});
  }
}
export default List;
