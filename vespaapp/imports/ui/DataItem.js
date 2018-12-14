import React from 'react';

class DataItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li key={this.key}>
        <p>{this.props.text}</p>
      </li>
    );
  }
}
export default DataItem;
