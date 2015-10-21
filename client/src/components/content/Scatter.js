var d3 = require('d3');

var Dot = React.createClass({
  render: function() {
    return (
      <circle cx={this.props.xcoord} cy={this.props.ycoord} r="1" style={{"fill": "red"}}> 
      </circle>
    );
  }
});

var Scatter = React.createClass({
  
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },


  drawDots: function(xscale, yscale) {
    var dots = this.props.data.map(function(dot) {
      if (dot.employees === '' || dot.employees_mom === '') {
        console.log('skip');
        return;
      }
      return (<Dot xcoord={xscale(+dot.employees)} ycoord={yscale(+dot.employees_mom)} />);
    });

    return dots;
  },

  render: function() {
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var x = d3.scale.linear()
      .range([0, width]);

    var y = d3.scale.linear()
      .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
    
    // clean the percent sign out of the data
    this.props.data.forEach(function(d) {
      return d.employees_mom = (d.employees_mom).replace('%', '');
    });

    // x.domain(d3.extent(this.props.data, function(d) {return +d.employees})).nice();
    // y.domain(d3.extent(this.props.data, function(d) {return +d.employees_mom})).nice();
    x.domain(d3.extent([0, 800]));
    y.domain(d3.extent([-50, 50]));

    return (
      <svg height={height} width={width}>
        <g>
          {this.drawDots(x, y)}
        </g>
      </svg>
    )
  }


});

module.exports = Scatter;
