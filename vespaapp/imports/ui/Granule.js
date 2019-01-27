import { Meteor } from 'meteor/meteor';
import React from 'react';

import { create_vespa_link, thumbnail_empty } from './external_resources.js';


export default class Granule extends React.Component {
  /*
  Represent an EPN-TAP _granule_ (i.e., Table record) in a UI/React interface.
  It is primary meant to be used in a list of items (ListGranules).
  This component expects to receive `props` with the following fields:
  - data:
    - granule_uid
    - thumbnail_url
    - identifier: IVO service identifier (ivo://...)
    - external_url
  - onItemClicked: callback to run when item is clicked.
  */

  constructor(props) {
    super(props);
  // callbacks
  this.onItemClicked = this.props.onItemClicked;
  // internal bindings
  this.itemClicked = this.itemClicked.bind(this);
  }

  render() {
    const thumbnail_url = this.props.data.thumbnail_url;
    const granule_uid = this.props.data.granule_uid;
    const ivo_id = this.props.data.identifier;
    const external_url = this.props.data.external_url;

    const link_vespa = ivo_id ? create_vespa_link(granule_uid, ivo_id) : undefined;

    return (
      <button type="button" className="list-group-item list-group-item-action" onClick={this.itemClicked}>
        <div className="media">
          <div className="media-left media-middle">
            <Thumbnail url={thumbnail_url} />
          </div>
          <div className="media-body">
            <Links link_vespa={link_vespa} link_tool={external_url} />
            <h4 className="media-heading" style={{wordWrap:'break-word', wordBreak:'break-all', whiteSpace:'normal !important'}}>
              {granule_uid}
            </h4>
          </div>
        </div>
      </button>
    );
  }

  itemClicked() {
    this.onItemClicked();
  }
}


function Thumbnail({ url }) {
  /*
    Return a clickable thumbnail
  */
  url = undefined;
  const thumbnail = url || thumbnail_empty;
  //FIXME: this <a/> element is ugly, we should use a 'modal' widget here!
  return (
      <a href={thumbnail} target="_blank">
        <img className="media-object" style={{height:'60px'}}
              src={thumbnail} alt="" />
      </a>
  );
}


function Links({ link_vespa, link_tool }) {
  /*
    Return a vertical arrangement of links to external URLs
  */
  return (
    <div className="well well-sm" style={{float:'right'}}>

      <a href={link_vespa} target="_blank" style={{display:"block"}}>
        <div className="glyphicon glyphicon-new-window"/>
      </a>

      <hr style={{height:'5px', border:0, display:'block', padding:0, margin:0}}/>

      <a href={link_tool} target="_blank" style={{display:"block"}}>
        <div className="glyphicon glyphicon-wrench"/>
      </a>

    </div>
  );
}
