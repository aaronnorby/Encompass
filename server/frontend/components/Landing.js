import React, { PropTypes, Component }  from 'react';
import d3                               from 'd3';
import { Card, CardHeader, CardText, CardTitle, CardActions, Avatar, RaisedButton } from 'material-ui';
import Parallel                         from './Parallel.js'; 


export default class Landing extends Component {
  constructor() {
    super();
    this.state = {data: [],
                  displayChart: false};

    this.setUpText = 'Encompass is the easiest place on the web to assess and compare your startup job offers.';
  }

  componentDidMount() {
    // Segment pageview call
    window.analytics.page();

  //   d3.csv('nutrients.csv', function(error, data) {
  //     if (error) console.log(error);

  //     this.setState({data: data});
  //     console.log('in Landing: ', data.length);
  //   }.bind(this));
  }

  displayChart() {
    this.setState({displayChart: true});
  }
    
  render() {
    return (
      <div style={{width:'95%', margin: 'auto'}}>  
      <h1>{'Welcome to Encompass'}</h1>
      <h2>{'We make it easy for you to understand your startup job offers'}</h2>
      <Card>  
        <CardHeader
            avatar={<Avatar style={{color:'black'}}>{'E'}</Avatar>}
            subtitle={"Insights"}
            title={"Encompass"}
        />
        <CardActions>
          <RaisedButton label="Display Chart" 
              onClick={this.displayChart.bind(this)} 
          />
        </CardActions>
        <CardText>
          {this.setUpText}
        </CardText>  
        <div>  
          {this.state.displayChart ? <Parallel data={this.state.data} /> : ''}
        </div>
      </Card> 
      </div>
    );
  }
}

