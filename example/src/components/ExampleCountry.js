import React, { Component } from 'react'
import './ExampleCountry.css';
import countryData from '../data/country-data.json';

import { FilterableContent, FilterableGroup, FilterableSection } from 'react-filterable-content'

export default class ExampleCountry extends Component {

  constructor(props){
    super(props);
    this.state = {
      keyword: '',
    }  
    this.onChange = this.onChange.bind(this);

  }

  onChange(event) {
    if (event && event.target) {
      const { value } = event.target;
      this.setState({keyword:value});
    }
  }

  renderCountry(){
    let countries = countryData.countries;
    let result = [];

    countries.forEach(  country =>{
      let states = country.states;
      let stateResult = [];
      let keyword = '';

      if(states){
        states.forEach( (state, index)=> {
          stateResult.push(<li key={`${state} ${index}`} keyword={country.country}>{state}</li>);
          keyword = `${keyword} ${state}`;
        });
      }

      result.push(
        <li key={country.country+'-key'}>
          <h3 keyword={keyword}>{country.country}</h3>
          <ul>
            {stateResult}
          </ul>
        </li>
      )

    });
    
    return result;
  }

  render () {
    let { keyword } = this.state;

    return (
      <div className="example-country-container">
        <h2>List Of Country and Province/States</h2>

        <input
          type={'text'}
          value={keyword}
          placeholder={'Filter Here'}
          onChange={this.onChange}
        />

        {keyword && <p className="keyword-name">{`Content that has "${keyword}" keyword`}</p>}
        
        <div>
          <FilterableContent keyword={keyword}>
            <ul>
              {this.renderCountry()}
            </ul>
          </FilterableContent>
        </div>
      </div>
    )
  }
}
