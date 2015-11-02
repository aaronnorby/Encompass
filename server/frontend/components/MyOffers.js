// this file is a subview of a user's offers that they received & inputted
// its parent is UserProfile.js

// import dependencies
import React, { PropTypes, Component }  from 'react';
import _                                from 'lodash';
import { Table, TableHeader, TableRow, TableRowColumn, TableHeaderColumn,TableBody, TableFooter, FontIcon, FlatButton, ClearFix } from 'material-ui';

import OfferVis from './OfferVis';

export default class MyOffers extends Component {
  constructor () {
    super();

    // sets the state for our table settings (material-ui)
    this.state = {
      fixedHeader: true,
      stripedRows: true,
      showRowHover: true,
      showOfferExplore: false,
      selectedOffer: []
    };

    this.selectedRow = [];
  }

  // removes an offer from MyOffers after user clicks a row and 'delete' button
  removeOffer() {
    var offer = this.props.apiData.offers[this.selectedRow[0]];
    this.props.removeApiData('/api/offer', offer.id)
  }
 
  doSelection(selection) {
    this.selectedRow = selection;
  }

  exploreOffer() {
    var offer = this.props.apiData.offers[this.selectedRow[0]];
    this.setState({selectedOffer: offer});
    this.setState({showOfferExplore: true});
  }

  render () {
    return (<div>
              <Table 
                fixedHeader={this.state.fixedHeader}
                onRowSelection={this.doSelection.bind(this)} 
              >
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn 
                        colSpan="5" 
                        style={{textAlign: 'center'}}
                    >
                      <h1>{'My Offers'}</h1>
                    </TableHeaderColumn>
                  </TableRow>

                  <TableRow>
                    <TableHeaderColumn>{'Offer #'}</TableHeaderColumn>
                    <TableHeaderColumn>{'Startup Name'}</TableHeaderColumn>
                    <TableHeaderColumn>{'Position'}</TableHeaderColumn>
                    <TableHeaderColumn>{'Salary (per year)'}</TableHeaderColumn>
                    <TableHeaderColumn>{'Equity %'}</TableHeaderColumn>
                  </TableRow>
                </TableHeader>

                <TableBody 
                  showRowHover={this.state.showRowHover}  
                  stripedRows={this.state.stripedRows}
                >
                  {_.map(this.props.apiData.offers, function (offer) {
                    return (
                      <TableRow>
                        <TableRowColumn>{offer.id ? offer.id : ' - '}</TableRowColumn>
                        <TableRowColumn>{offer.Company.name ? offer.Company.name : ' - '}</TableRowColumn>
                        <TableRowColumn>{offer.position ? offer.position : ' - '}</TableRowColumn>
                        <TableRowColumn>{offer.salary ? '$' + offer.salary : ' - '}</TableRowColumn>
                        <TableRowColumn>{offer.equity ? offer.equity + '%' : ' - '}</TableRowColumn>
                      </TableRow>
                    )
                  })
                  }
                </TableBody>
              </Table>
              
              <div>
                
                { /* button to explore an offer in detail */ }
                <FlatButton 
                    label="Explore" 
                    onClick={this.exploreOffer.bind(this)}
                    primary={true}
                />

                { /* button to delete an offer from table */ }
                <FlatButton
                    label="Delete"
                    onClick={this.removeOffer.bind(this)}
                    primary={true}
                />
              </div>

              <div>
                {this.state.showOfferExplore ? <OfferVis data={this.state.selectedOffer} /> : ''}
              </div>
            </div>)
  }
}

MyOffers.propTypes = {
  apiData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  removeApiData: PropTypes.func.isRequired
}
