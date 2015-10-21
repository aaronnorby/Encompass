var d3 = require('d3');
var Scatter = require('./Scatter.js');

var Count = React.createClass({
  
  render: function() {
    var countEm = function(d) { return Object.keys(d).length;};  

    return (
      <h2>{countEm(this.props.data)} Companies</h2>    
    );
  }
});


var ChartFrame = React.createClass({
  getInitialState: function() {
    var height = 375;
    var width = 820;
    return {
      svgHeight: height,
      svgWidth: width
    }
  },

  render: function() {
    var svgStyle = {border: "2px solid black"};

    return (
        <svg style={svgStyle} 
          height={this.state.svgHeight}
          width={this.state.svgWidth}
          dangerouslySetInnerHTML={{__html: "<image height=" + this.state.svgHeight + 
            " width=" + this.state.svgWidth + " xlink:href=" + this.props.source + " />"}}>
        </svg>
    )
  }
});


var Landing = React.createClass({
  getInitialState: function() {
    return {
      sources: ['images/mom-employees.png', 'images/funding-employee-funding.png', 'images/funding-employee-growth.png'],
      data: []
    }   
  },

  componentDidMount: function() {
    d3.json('data/seedData.json', function(error, data) {
      if (error) console.log(error);

      this.setState({data: data});
    }.bind(this));
  },

  drawCharts: function() {
    var charts = this.state.sources.map(function(source) {
      return (<ChartFrame source={source}/>);
    });
    return charts;
  },

  render: function() {
    var svgStyle = {border: "2px solid black"}
    return (
      <div>
        <div><h1>Placeholder Charts</h1></div>
        <div>
          {this.drawCharts()}
        </div>

        <div>
          <Count data={this.state.data} />
        </div>

        <div>
          <Scatter data={this.state.data} />
        </div>
      </div>  
    )
  }
});

module.exports = Landing;
