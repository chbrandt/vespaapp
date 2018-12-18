import React from 'react';

class DataItem extends React.Component {
  constructor(props) {
    super(props);
    /*
    Props are expected to be:
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
  }

  render() {
    return (
      <li key={this.key}>
        <p>{this.props.text}</p>
      </li>
    );
    // return (
    //   <li key={this.props.id}>
    //     <div className="thumbnail" />
    //     <div className="reference" />
    //   </li>
    // );
  }
}
export default DataItem;
