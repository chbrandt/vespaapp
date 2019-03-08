import React from 'react';
import ReactDOM from 'react-dom';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";

import FilterPanel from './FilterPanel.js';
import Granule from './Granule.js';


export default class ListGranules extends React.Component {
  /*
  Present a list of EPN-TAP granules, not necessary from only one service.
  This component expects to receive `props` with the following fields:
  - items
  */
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      items: [],
      product_types: []
    }

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100
    });

    this.renderItems = this.renderItems.bind(this);
    this.filterItemsText = this.filterItemsText.bind(this);
    this.filterItemsCheck = this.filterItemsCheck.bind(this);
  }

  render() {
    // var product_types = [];
    // this.props.items.forEach((item) => {
    //   if (!product_types.includes(item.dataproduct_type)) {
    //     product_types.push(item.dataproduct_type);
    //   }
    // });
    // var selectors = {};
    // product_types.forEach((type_) => {
    //   selectors[type_] = this.filterItemsCheck;
    // });

    const listHeight = this.props.style.height;
    return (
      <div id="searchable-list" className="panel">

        <div className="panel-heading">
          <FilterPanel  onTextChange={{callback: this.filterItemsText,
                                       topics: null}}
                        onSelectionChange={{callback: this.filterItemsCheck,
                                            controls: ['Images','DataCubes']}}
                        onRangeChange={{callback: ()=>{},
                                        limits: undefined}}
          />
        </div>

        <div className="panel-body list-group" style={this.props.style}>
          <AutoSizer>
            {({ width, height }) => {
              return <List
                width={width}
                height={height}
                deferredMeasurementCache={this.cache}
                rowHeight={this.cache.rowHeight}
                rowRenderer={this.renderItems}
                rowCount={this.state.items.length || this.props.items.length}
                overscanRowCount={10} />
              }}
          </AutoSizer>
        </div>
      </div>
    );
  }

  renderItems({
    index,       // Index of row
    isScrolling, // The List is currently being scrolled
    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    key,         // Unique key within array of rendered rows
    parent,      // Reference to the parent List (instance)
    style        // Style object to be applied to row (to position it);
                 // This must be passed through to the rendered row element.
    }) {
    // hack to work around empty list at the very beginning
    const dataItems = !(this.state.query || this.state.items.length)
                    ? this.props.items
                    : this.state.items;
    // const item = this.props.items[index];
    const item = dataItems[index];
    console.log(dataItems.length);
    if (!item) {
      return '';
    }

    const granule_uid = item.granule_uid;
    const link_datum = link_vespa_crism + sq+granule_uid+sq + '+OR+granule_uid+LIKE+' + sq+pc+granule_uid.toUpperCase()+pc+sq;
    const access_url = item.access_url;
    const thumbnail_url = item.thumbnail_url;

    return (
      <CellMeasurer
        key={key}
        cache={this.cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}>
        <Granule key={key} data={item} style={style}/>
      </CellMeasurer>
    );
  }

  filterItemsText(event) {
    const text = event.target.value.toLowerCase();
    console.log("Text in the box: " + text);
    this.setState({ query: text });
    var filteredList = this.props.items;
    if (text) {
      console.log("Text in the box?: " + text);
      filteredList = filteredList.filter((item) => {
        const s_text = [item.granule_uid,
                        item.schema_epn_core,
                        item.access_format,
                        item.instrument_name,
                        item.instrument_host_name,
                        item.publisher,
                        item.service_title,
                        item.target_name,
                        item.target_class];
        return (s_text.join(" ").toLowerCase().search(text) !== -1);
      });
    }
    console.log("Size of filterList: " + filteredList.length);
    this.setState({items: filteredList});
  }

  filterItemsCheck(event) {
    const label = event.target.value;
    const checked = event.target.checked;
    var filteredList = this.props.items;
    if (! checked) {
      filteredList = this.state.items.length ? this.state.items : this.props.items;
    }
    console.log("Parent/caller list of items: " + this.props.items.length);
    console.log("Child/widget input event: " + event.target.value + " " + event.target.checked);
  }


  // filterList(event) {
  //   this.setState({ query: event.target.value });
  //   var filteredList;
  //   if (this.state.query) {
  //     filteredList = this.state.items;
  //     filteredList = filteredList.filter((item) => {
  //       return item.target_name.toLowerCase().search(
  //         event.target.value.toLowerCase()) !== -1;
  //     });
  //   } else {
  //     filteredList = this.props.items;
  //   }
  //   this.setState({items: filteredList});
  // }
}

const link_vespa_crism = 'http://vespa.obspm.fr/planetary/data/display/?f-url_op=&f-schema_op=&f-target_name=&f-instrument_host_name=&f-instrument_name_op=%3D&f-instrument_name=&f-processing_level=&f-time_search_type_op=is_included_in&f-time_interval_type_op=between&f-time_min=&f-time_max=&f-time_center=&f-time_delta_value_op=&f-time_exp_min_op=%3E%3D&f-time_exp_min=&f-time_exp_max_op=%3C%3D&f-time_exp_max=&f-time_sampling_step_min_op=%3E%3D&f-time_sampling_step_min=&f-time_sampling_step_max_op=%3C%3D&f-time_sampling_step_max=&f-spatial_frame_type=&f-location_interval_op=intersection&f-location_values_op=between&f-c1min=&f-c1max=&f-c1center=&f-c1delta=&f-c2min=&f-c2max=&f-c2center=&f-c2delta=&f-c3min=&f-c3max=&f-c3center=&f-c3delta=&f-c1_resol_min=&f-c1_resol_max=&f-c1_resol_center=&f-c1_resol_delta=&f-c2_resol_min=&f-c2_resol_max=&f-c2_resol_center=&f-c2_resol_delta=&f-c3_resol_min=&f-c3_resol_max=&f-c3_resol_center=&f-c3_resol_delta=&f-spectral_interval_op=intersection&f-spectral_unit_op=hertz&f-spectral_range_min=&f-spectral_range_max=&f-spectral_resolution_min=&f-spectral_resolution_max=&f-spectral_sampling_step_min=&f-spectral_sampling_step_max=&f-phase_min_op=%3E%3D&f-phase_min=&f-phase_max_op=%3C%3D&f-phase_max=&f-incidence_min_op=%3E%3D&f-incidence_min=&f-incidence_max_op=%3C%3D&f-incidence_max=&f-emergence_min_op=%3E%3D&f-emergence_min=&f-emergence_max_op=%3C%3D&f-emergence_max=&f-granule_uid=&f-granule_gid=&f-obs_id=&f-measurement_type=&f-species=&f-feature_name=&resource_id=ivo%3A%2F%2Fvopdc.obspm%2Flesia%2Fbdip%2Fepn&services=form_registered_services&query_source=text&f-text_query=granule_uid%3D';
const sq = '%27';
const pc = '%25';
