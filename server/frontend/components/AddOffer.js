import React, { PropTypes, Component } from 'react';
import { Typeahead } from 'react-typeahead';
import _                                from 'lodash';
import cookie from 'react-cookie';

export default class AddOffer extends Component {
 
  constructor() {
    super();
    this.state = {data: []}
  }

  componentDidMount() {
    this.setState({companyNames: _.pluck(this.props.companies, 'name')});
  }

  handleSubmit (e) {
    e.preventDefault();
    let formData = {
      company_name: this.state.company_name.trim(),
      position: this.refs.position.value.trim(),
      salary: this.refs.salary.value,
      equity: this.refs.equity.value,
      vesting_start_date: this.refs.vesting_start_date.value,
      vesting_end_date: this.refs.vesting_end_date.value,
      vesting_cliff_date: this.refs.vesting_cliff_date.value,
      vesting_cliff_percent: this.refs.vesting_cliff_percent.value,
      last_financing_round_valuation: this.refs.last_financing_round_valuation.value,
      estimated_exit_valuation: this.refs.estimated_exit_valuation.value
      // benefits: this.refs.benefits.value
    }

    this.props.postApiData('/api/offer', formData);

    this.setState({company_name: ''});
    this.refs.position.value = '';
    this.refs.salary.value = '';
    this.refs.equity.value = '';
    this.refs.vesting_start_date.value = '';
    this.refs.vesting_end_date.value = '';
    this.refs.vesting_cliff_date.value = '';
    this.refs.vesting_cliff_percent.value = '';
    this.refs.last_financing_round_valuation.value = '';
    this.refs.estimated_exit_valuation.value = ''; 
    // this.refs.benefits.value = '';
  }

  checkCookie() {
    let usercookie = cookie.load('connect.sid');
    return usercookie;
  }


  render () {
    return (
      <div> 
      {this.checkCookie() ?
      <div>
        <h1 id="heading">Add Your Offer</h1>
        {status}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="company">Company *</label>
              <Typeahead 
                className="form-control" 
                name="company_name" 
                options={ this.state.companyNames } 
                placeholder="Google" 
                maxVisible={10}
                onOptionSelected={
                  (name) =>  {
                    this.setState({company_name: name});
                  }
                }
                />
          </div>

          <div className="form-group">
            <label htmlFor="position">Position *</label>
            <input className="form-control" name="position" ref="position" type="text" />
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary *</label>
            <input className="form-control" name="salary" ref="salary" type="number" />
          </div>

          <div className="form-group">
            <label htmlFor="equity">Equity *</label>
            <input className="form-control" name="equity" ref="equity" type="number" />
          </div>

          <div className="form-group">
            <label htmlFor="vesting_start_date">Vesting Start Date *</label>
            <input className="form-control" name="vesting_start_date" ref="vesting_start_date" type="date" />
          </div>

          <div className="form-group">
            <label htmlFor="vesting_end_date">Vesting End Date *</label>
            <input className="form-control" name="vesting_end_date" ref="vesting_end_date" type="date" />
          </div>

          <div className="form-group">
            <label htmlFor="vesting_cliff_date">Vesting Cliff Date *</label>
            <input className="form-control" name="vesting_cliff_date" ref="vesting_cliff_date" type="date" />
          </div>

          <div className="form-group">
            <label htmlFor="vesting_cliff_percent">Vesting Cliff Percent *</label>
            <input className="form-control" name="vesting_cliff_percent" ref="vesting_cliff_percent" type="number" />
          </div>

          <div className="form-group">
            <label htmlFor="last_financing_round_valuation">Most Recent Valuation *</label>
            <input className="form-control" name="last_financing_round_valuation" ref="last_financing_round_valuation" type="number" />
          </div>

          <div className="form-group">
            <label htmlFor="estimated_exit_valuation">Estimated Exit Valuation *</label>
            <input className="form-control" name="estimated_exit_valuation" ref="estimated_exit_valuation" type="number" />
          </div>

          <h3>What additional benefits do you receive?</h3>
          <div className="form-group">
            <label className="checkbox-inline"><input name="benefits" type="checkbox" value="food" />Food</label>
            <label className="checkbox-inline"><input name="benefits" type="checkbox" value="healthcare" />Healthcare</label>
          </div>

          <div className="form-group">
            <button className="btn btn-primary" type="submit" value="Post">Add Offer</button>
          </div>
        </form>
      </div> :
      <h1>Please log in to use this feature</h1>}
      </div>
    )
  }
};

