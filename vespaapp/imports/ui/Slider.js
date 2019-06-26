import { Meteor } from 'meteor/meteor';
import React from 'react';

/*
  Slider here uses jQuery, which conflicts with React.
  The docs talk about that here:
  * https://reactjs.org/docs/integrating-with-other-libraries.html
*/
class _Slider extends React.Component {
  componentDidMount() {
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

    this.handleChange = this.handleChange.bind(this);
    this.$el.on('change', this.handleChange);

      // <div data-role="rangeslider">
      //   <label for="price-min">Price:</label>
      //   <input type="range" name="price-min" id="price-min" value="200" min="0" max="1000">
      //   <label for="price-max">Price:</label>
      //   <input type="range" name="price-max" id="price-max" value="800" min="0" max="1000">
      // </div>
  }

  componentWillUnmount() {
    this.$el.off('change', this.handleChange);
    this.$el.slider('destroy');
  }

  handleChange(e) {
    // this.props.onChange(e.target.value);
  }

  render() {
    return <div ref={el => this.el = el} />;
  }
}


function Slider() {
  return (
    <_Slider/>
  );
  // <_Slider onChange={value => console.log(value)}/>
}
export default Slider;
