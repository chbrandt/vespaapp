import { Meteor } from 'meteor/meteor';
import React from 'react';

// import { Notes } from '../api/notes.js';

class DataItemCrism extends React.Component {
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
      <button type="button" className="list-group-item list-group-item-action"
        onClick={this.itemClicked.bind(this)}
        >
          <h6 className="item-name">{this.props.data.granule_uid}</h6>
          <span>
          { Meteor.user() ?
            <input className="item-save"
              type="checkbox"
              readOnly
              checked={this.state.saved}
              onClick={this.toggleSaved.bind(this)}
            /> : ''
          }
        </span>
      </button>
    );
  }

  itemClicked() {
    // alert(String(this.props.data.name) + ": I was clicked!");
  }

  toggleSaved() {
    const noteId = Meteor.user().username + this.props.data.name;
    const target = this.props.target;
    if (! this.state.saved) {
      Meteor.call('notes.insert', { noteId, target });
    } else {
      Meteor.call('notes.remove', noteId);
    }

    this.setState({
      saved: ! this.state.saved
    });
  }
}
export default DataItemCrism;
