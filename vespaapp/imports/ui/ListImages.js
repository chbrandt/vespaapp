import { Meteor } from 'meteor/meteor';
import React from 'react';
import { List } from "react-virtualized";

import './ListImages.css';

// import { Targets } from '../api/targets.js';

/*
ListTargets will list all the abailable targets in Data database/collection.
This component should also provide a search engine to easily access targets
and also to search for content _inside_ the target items.
For example, "Mars" is a target (of type "planet") and has named geological
formations, like "Arabia Terra"
*/
class ListImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      items: []
    };
    this.renderItems = this.renderItems.bind(this);
  }

  render() {
    const listHeight = 600;
    const rowHeight = 100;
    const rowWidth = 800;
    return (
      <div id="searchable-list" className="col">
        <div className="search-box">
          {this.renderSearchBox()}
        </div>
        <div className="list-targets" style={{height:600, width:800}}>
          <List
            width={rowWidth}
            height={listHeight}
            rowHeight={rowHeight}
            rowRenderer={this.renderItems}
            rowCount={this.props.items.length} />
          {/*this.renderList()*/}
        </div>
      </div>
    );
  }

  renderSearchBox() {
    return (
      <div className="search-box">
          <div className="row">
              <div className="col">
                  <input id="searchInput" className="form-control"
                    type="text"
                    onChange={this.filterItems.bind(this)}
                    placeholder="Search targets"
                  />
              </div>
          </div>
      </div>
    )
  }

  filterItems(event) {
    const text = event.target.value.toLowerCase();
    this.setState({ query: text });
    var filteredList = this.props.items;
    if (text) {
      filteredList = filteredList.filter((item) => {
        return item.obs_id.toLowerCase().search(text) !== -1;
      });
    }
    this.setState({items: filteredList});
  }

  renderItems({ index, key, style }) {
    const item = this.props.items[index];
    // <div className="row" key={key} style={style}>
    return (
      <div className="row" style={style} key={key}>
        <img className="image" src={item.thumbnail_url} alt="Card image cap"/>
        <div className="content">
            <h5 className="card-title">{item.granule_uid+":"+item.granule_gid}</h5>
            <a href={item.access_url} target="_blank" className="card-link">Go somewhere</a>
        </div>
      </div>
    );
  }
}
export default ListImages;
