import React, { ProtoTypes, Component } from 'react';
import _                                from 'lodash';
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui';
export default class CompanyProfile extends Component {

  constructor () {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchApiData('/api/company/' + this.props.companyId);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.companyId !== nextProps.companyId)
      this.props.fetchApiData('/api/company/' + nextProps.companyId);
  }

  render() {
    const { apiData } = this.props;
    return (
      
      <div>
      { apiData.employees &&
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}> 
            <TableRow>
              <TableHeaderColumn style={{textAlign: 'center'}} colSpan={2} key='name'> <h2>{apiData.name}</h2> </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
                <TableRowColumn>Company Website</TableRowColumn> <TableRowColumn key='website'>{apiData.website}</TableRowColumn>
            </TableRow>
            <TableRow>
                <TableRowColumn>Total Employees</TableRowColumn> <TableRowColumn key='employees'>{apiData.employees.toLocaleString()}</TableRowColumn>
            </TableRow>
            <TableRow>    
                <TableRowColumn>Founding Date</TableRowColumn> <TableRowColumn key='founding_date'>{apiData.founding_date ? apiData.founding_date.split('T')[0] : <i>No date on record</i>}</TableRowColumn>
            </TableRow>
            <TableRow> 
                <TableRowColumn>Company Stage</TableRowColumn> <TableRowColumn key='stage'>{apiData.stage}</TableRowColumn>
            </TableRow>
            <TableRow>    
                <TableRowColumn>Total Funding (USD)</TableRowColumn> <TableRowColumn key='total_funding'>${apiData.total_funding.toLocaleString()}</TableRowColumn>
            </TableRow>
            <TableRow>    
                <TableRowColumn>Last Funding Date</TableRowColumn> <TableRowColumn key='last_funding_date'>{apiData.last_funding_date.split('T')[0]}</TableRowColumn>
            </TableRow>
            <TableRow>    
                <TableRowColumn>City</TableRowColumn> <TableRowColumn key='city'>{apiData.city}</TableRowColumn>
            </TableRow>
            <TableRow>    
                <TableRowColumn>State</TableRowColumn> <TableRowColumn key='state'>{apiData.state}</TableRowColumn>
            </TableRow>
            <TableRow>    
                <TableRowColumn>Country</TableRowColumn> <TableRowColumn key='country'>{apiData.country}</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      }
      </div>
    )
  }
};

