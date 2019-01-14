import React from 'react';
import ReactDOM from 'react-dom';

import DataItem from './DataItem.js';

import { Notes } from '../api/notes.js';
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
      <div id="list" className="col-3">

        <form>
          <input
            placeholder="Type to filter entries"
            style={{"width":"100%"}}
            type="text"
            onChange={this.filterList.bind(this)}
          />
        </form>

        <ul className="list-group">
          {this.renderItems()}
        </ul>
      </div>
    );
  }

  renderItems() {
    // hack to work around empty list at the very beginning
    var dataItems = !(this.state.query || this.state.items.length)
                    ? this.props.items
                    : this.state.items;
    return dataItems.map((item) => {
      var saved = this.props.notes.find((note) => {
        return note._id === Meteor.user().username + item.name;
      }) ? true : false;
      return (
        <DataItem key={item.name} data={item} target={this.props.target} isSaved={saved}/>
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
      filteredList = this.props.items;
    }
    this.setState({items: filteredList});
  }
}
export default List;
