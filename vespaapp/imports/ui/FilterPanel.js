import React from 'react';

/*
  This component setup a container with three different types of
  filters (or controls, if you want), disposed in a 'tab' widget:
  * a search box;
  * a range slider;
  * a group of check-buttons.

  It takes three properties as input, each of them being the
  respective callbacks:
  * `onTextChange` (for Search-Box);
  * `onRangeChange` (for Range-Slider);
  * `onSelectionChange` (for Check-Buttons).

  The rendering of the widgets is done after a valid function is given;
  in other words, if you don't want some of the above widgets, just don't
  give the respective callback.
  The following example will render a tab-container with the Search-Box and
  the Range-Slider but _not_ the Check-Buttons:
  ```
  <FilterPanel onTextChange={()=>{}} onRangeChange={()=>{}} />
  ```
*/
export default class FilterPanel extends React.Component {
  constructor(props) {
    super(props);

    // callbacks
    this.onTextChange = this.props.onTextChange;
    this.onRangeChange = this.props.onRangeChange;
    this.onSelectionChange = this.props.onSelectionChange;
  }

  render() {
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
