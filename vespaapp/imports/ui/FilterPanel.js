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

    this._renderSlider = this._renderSlider.bind(this);
  }

  render() {
    return (
      <div style={{height:'120px'}}>

        <ul id="filter-tabs" className="nav nav-pills" role="tablist" style={{border:0}}>

          {this.onTextChange ?
            <li role="presentation" className="active" style={{border:0}}>
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

          {this.onSelectionChange && this.selectionControls.length > 0 ?
            <li role="presentation">
              <a href="#product" aria-controls="datatype-selector" role="tab" data-toggle="tab">
                Product
              </a>
            </li>
          : ''}

        </ul>


        <div className="tab-content" style={{height:'80px'}}>

          {this.onTextChange ?
            <div role="tabpanel" className="tab-pane active well well-sm" id="search" style={{backgroundColor:'white', height:'100%'}}>
              {this.renderSearchBox()}
            </div>
          : ''}

          {this.onRangeChange && this.rangeLimits.length == 2 ?
            <div role="tabpanel" className="tab-pane well well-sm" id="time" style={{backgroundColor:'white', height:'100%', margin:0, padding:0}}>
              {this.renderTimeSlider()}
            </div>
          : ''}

          {this.onSelectionChange ?
            <div role="tabpanel" className="tab-pane well well-sm" id="product" style={{backgroundColor:'white', height:'100%'}}>
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
            <div className='col-xs-6'>
              <input type='text' id='valsmin' readOnly className="text-secondary" style={{border:0, padding:0, margin:'0 0 0 0', textAlign:'left', width:'100%'}}/>
            </div>
            <div className='col-xs-6'>
              <input type='text' id='valsmax' readOnly className="text-secondary" style={{border:0, padding:0, margin:'0 0 0 0', textAlign:'right', width:'100%'}}/>
            </div>
          </div>

          <hr style={{height:'5px', border:0, display:'block', padding:0, margin:0}}/>
          <div ref={el => this.el = el}/>
          <hr style={{height:'5px', border:0, display:'block', padding:0, margin:0}}/>

          <div className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
            <input type='text' id='rangevals' readOnly className="well well-sm text-primary" style={{border:0, padding:0, margin:'0 0 0 0', textAlign:'center', width:'100%'}}/>
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

    this._renderSlider();
  }

  componentDidUpdate() {
    this._renderSlider();
  }

  _renderSlider() {
    var rangeMin = this.props.onRangeChange.limits[0];
    rangeMin = Math.floor(rangeMin);
    var rangeMax = this.props.onRangeChange.limits[1];
    rangeMax = Math.ceil(rangeMax) + 1;
    $('#valsmin').val(rangeMin);
    $('#valsmax').val(rangeMax);
    this.$el = $(this.el);
    this.$el.slider({
      range: true,
      min: rangeMin,
      max: rangeMax,
      values: [ rangeMin, rangeMax ],
      slide: function( event, ui ) {
        console.log(ui.values);
        $( "#rangevals" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $('#rangevals').val(rangeMin + ' - ' + rangeMax);
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
