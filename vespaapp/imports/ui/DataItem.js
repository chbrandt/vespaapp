import React from 'react';
import { Meteor } from 'meteor/meteor';

import { Notes } from '../api/notes.js';

class DataItem extends React.Component {
  constructor(props) {
    super(props);
    /*
    Props are expected to be:
    - key
      -
    - id
      - granule_uid
      - granule_gid
      - obs_id
    - thumbnail
      - thumbnail_url
    - body
      - target_name
    - bbox
      - c1min
      - c1max
      - c2min
      - c2max
    - geometry
      - s_region
    - reference
      - bib_reference
    */
    this.state = {
      saved: props.isSaved
    }
  }

  render() {
    return (
      <li>
        <span>
          <h6 className="item-name">{this.props.data.name}</h6>
          { this.props.user ?
            <input className="item-save"
              type="checkbox"
              readOnly
              checked={this.state.saved}
              onClick={this.toggleSaved.bind(this)}
            /> : ''
          }
        </span>
      </li>
    );
  }

  toggleSaved() {
    if (!this.state.saved) {
      Notes.insert({
        collection: 'mars',
        id: this.props.data.id,
        _id: 'mars_' + this.props.data.id,
        item: this.props.data.name,
        savedAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      });
    } else {
      Notes.remove({
        _id: 'mars_' + this.props.data.id
      });
    }
    this.setState({
      saved: !this.state.saved
    })
  }
}
export default DataItem;
