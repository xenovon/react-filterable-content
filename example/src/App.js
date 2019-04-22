import React, { Component } from 'react';
import ExampleComplex from './components/ExampleComplex';
import ExampleSimple from './components/ExampleSimple';
import { FilterableContent, FilterableGroup, FilterableSection } from 'react-filterable-content';

export default class App extends Component {

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

  render () {

    return (
      <div className="main-container">
        <ExampleSimple/>
        <ExampleComplex/>
      </div>
    )
  }
}
