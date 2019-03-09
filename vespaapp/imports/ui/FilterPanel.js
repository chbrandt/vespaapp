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

    //FIXME: keep the states of the check-buttons in a state object,
    // when the parent component re-render our filters must keep the state.

    // callbacks
    console.log(this.props.onTextChange);
    this.onTextChange = this.props.onTextChange.callback;
    this.textTopics = this.props.onTextChange.topics;

    console.log(this.props.onRangeChange);
    this.onRangeChange = this.props.onRangeChange.callback;
    this.rangeLimits = this.props.onRangeChange.limits;

    console.log(this.props.onSelectionChange);
    this.onSelectionChange = this.props.onSelectionChange.callback;
    this.selectionControls = this.props.onSelectionChange.controls;
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

          {this.onRangeChange && this.rangeLimits.length == 2 ?
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


        <div className="tab-content" style={{width:'100%', height:'50px'}}>

          {this.onTextChange ?
            <div role="tabpanel" className="tab-pane active" id="search">
              {this.renderSearchBox()}
            </div>
          : ''}

          {this.onRangeChange && this.rangeLimits.length == 2 ?
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
      <div className="search-box panel-heading">
        <input id="searchText" className="form-control"
          type="text"
          onChange={this.onTextChange}
          placeholder="Search targets"
        />
      </div>
    );
  }

  renderTimeSlider() {
    return (
      <div className="panel-heading">
        <div className="container" style={{width:'100%'}}>

          <div className="row">
            <strong className="col-xs-3" style={{textAlign:'left'}}>
              Left-limit
            </strong>
            <strong className="col-xs-3 col-xs-offset-6" style={{textAlign:'right'}}>
              Right-limit
            </strong>
          </div>

          <hr style={{height:'5px', border:0, display:'block', padding:0, margin:0}}/>

          <div ref={el => this.el = el}/>

          <hr style={{height:'5px', border:0, display:'block', padding:0, margin:0}}/>

          <div className="form-inline">
            <div className="form-group">
            <label>
              Selected range:
              <input type='text' id='rangevals' readOnly className="well well-sm text-primary" style={{border:0, padding:0, margin:'0 0 0 5px', textAlign:'center'}}/>
            </label>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderTypeSelectors() {
    return (
      <div className="panel-heading">
        <form className="form-inline">
          {_renderSelector(this)}
        </form>
      </div>
    );
  }

  componentDidMount() {
    // Reference: http://jqueryui.com/slider/#range
    $('#filter-tabs a').click( function(e) {
      e.preventDefault();
      $(this).tab('show');
    })

    var rangeMin = this.rangeLimits[0];
    var rangeMax = this.rangeLimits[1];
    this.$el = $(this.el);
    this.$el.slider({
      range: true,
      min: rangeMin,
      max: rangeMax,
      values: [ rangeMin, rangeMax ],
      slide: function( event, ui ) {
        console.log(ui.values);
        $( "#rangevals" ).val( ' ' + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $('#rangevals').val( ' ' + rangeMin + ' - ' + rangeMax);
  }
}

function _renderSelector(o) {
  return o.selectionControls.map((ctrl) => {
    return (
      <div className="checkbox-inline" key={ctrl}>
        <label>
          <input type="checkbox" defaultChecked
            value={ctrl}
            onChange={o.onSelectionChange}
          /> {ctrl}
        </label>
      </div>
    );
  });
}
