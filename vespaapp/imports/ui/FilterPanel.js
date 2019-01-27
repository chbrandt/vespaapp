import React from 'react';

export default class FilterPanel extends React.Component {
  constructor(props) {
    super(props);

    // callbacks
    this.onTextChange = this.props.onTextChange;
    this.onRangeChange = this.props.onRangeChange;
    this.onSelectionChange = this.props.onSelectionChange;
  }

  render() {
    // return (
    //   <div ref={el => {this.elem = el}} />
    // );
    // return (
    //   <ul id="filter-tabs" className="nav nav-tabs">
    //     <li role="presentation" className="active"><a href="#text">Search</a></li>
    //     <li role="presentation"><a href="#range">Time</a></li>
    //     <li role="presentation"><a href="#check">Products</a></li>
    //   </ul>
    // );
    return (
      <div>
        <ul id="filter-tabs" className="nav nav-tabs" role="tablist">
          {this.onTextChange ?
            <li role="presentation" className="active">
              <a href="#search" aria-controls="search-box" role="tab" data-toggle="tab">
                Search
              </a>
            </li>
          : ''}
          {this.onRangeChange ?
            <li role="presentation">
              <a href="#time" aria-controls="time-slider" role="tab" data-toggle="tab">
                Time
              </a>
            </li>
          : ''}
          {this.onSelectionChange ?
            <li role="presentation">
              <a href="#product" aria-controls="datatype-selector" role="tab" data-toggle="tab">
                Product
              </a>
            </li>
          : ''}
        </ul>

        <div className="tab-content" style={{width:'100%'}}>
          {this.onTextChange ?
            <div role="tabpanel" className="tab-pane active" id="search">
              {this.renderSearchBox()}
            </div>
          : ''}
          {this.onRangeChange ?
            <div role="tabpanel" className="tab-pane" id="time">
              {this.renderTimeSlider()}
            </div>
          : ''}
          {this.onSelectionChange ?
            <div role="tabpanel" className="tab-pane" id="product">
              {this.renderTypeSelectors()}
            </div>
          : ''}
        </div>
      </div>
    );
  }

  renderSearchBox() {
    return (
      <div className="search-box">
        <input id="searchText" className="form-control"
          type="text"
          onChange={this.onTextChange}
          placeholder="Search targets"
        />
      </div>
    );
  }

  renderTimeSlider() {
    return <div ref={el => this.el = el} />;
  }

  renderTypeSelectors() {
    return (
    <div>
      <span className="label label-default"><input type="checkbox"/>Images</span>
      <span className="label label-default"><input type="checkbox"/>Spectra</span>
      <span className="label label-default"><input type="checkbox"/>Datacubes</span>
    </div>
  );
    // return (
    //   <div className="btn-group btn-group-justified" role="group">
    //     <button className="btn disable"><input className="checkbox-inline" type="checkbox"/>Images</button>
    //     <button className="btn disable"><input className="checkbox-inline" type="checkbox" />Spectra</button>
    //     <button className="btn disable"><input className="checkbox-inline" type="checkbox" />Datacubes</button>
    //   </div>
    // );
  }

  componentDidMount() {
    // this.$elem = $(this.elem);
    $('#filter-tabs a').click( function(e) {
      e.preventDefault();
      $(this).tab('show');
    })

    this.$el = $(this.el);
    this.$el.slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        console.log(ui.values);
        // $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });

  }
}
