import React, { Component } from 'react'
import './ExampleBlock.css';
import { FilterableContent, FilterableSection } from 'react-filterable-content'

export default class ExampleBlock extends Component {

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
    let { keyword } = this.state;
    
    return (
      <div className="example-block-container">
        <input
          type={'text'}
          value={keyword}
          placeholder={'input keyword'}
          onChange={this.onChange}
        />

        <p className="keyword-name">{keyword && `Content that has "${keyword}" keyword`}</p>

        <FilterableContent 
          keyword={keyword}
          config={{
            maxCache: 60,
          }}
          >
          <FilterableSection 
            className="panel"
            stickyContent={<h3>Group Demo</h3>}
           >
            <p>This paragraph is not grouped with the third paragraph</p>
            <span filterable-group="true">
              <p><i>This paragraph</i> is grouped with the third paragraph</p>
              <p>A revenue loses! The owed break refreshes software. Programming weighs the forest. On top of the institute dresses software. Software negates programming into its isolate blessed. The aardvark bells programming over a portrayed biology.</p>
            </span>
          </FilterableSection>


          <FilterableSection 
            className="panel"
            stickyContent={<h3>Sticky Demo</h3>}
           >
            <p filterable-sticky="true">This paragraf will always be visible</p>
            <p>This paragraf will only visible if some of the content match with the keyword.</p>
          </FilterableSection>


          <FilterableSection 
            className="panel"
            stickyContent={<h3>Ignore Demo 1</h3>}
           >
            <h4 filterable-ignore="true">This title is ignored</h4>
            <p>This paragraf is not ignored</p>
          </FilterableSection>

        </FilterableContent>
      </div>
    )
  }
}
