import React, { Component } from 'react'
import './ExampleComplex.css';
import { FilterableContent, FilterableGroup, FilterableSection } from 'react-filterable-content'

export default class ExampleSimple extends Component {

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
    console.log(keyword);

    return (
      <div className="example-complex-container">
        <input
          type={'text'}
          value={keyword}
          placeholder={'input keyword'}
          onChange={this.onChange}
        />

        <p className="keyword-name">{keyword && `Content that has "${keyword}" keyword`}</p>

        <FilterableContent keyword={keyword}>
          <p>Adnan</p>
          <p>Isi konten 2 phoenik</p>
          <p>Isi kontent anu anu</p>
          <ul>
            <li keyword="Mata-mata">Test teta 1</li>
            <li>Test beta 2</li>
            <li>Test mata 3</li>
          </ul>
          <FilterableSection
            title={<h1>This is Filterable Section Example</h1>}
            description={<p>This is Filterable Description mantap</p>}
          >
            <p>This is one section, you can add many content as you like</p>
          </FilterableSection>
          <div>
            <div filterable-sticky="true">
              This node is Sticky
              <div>This div should not</div>
            </div>
            <h1>Judul 1</h1>
            <h1><i>Kaka Kelas 2</i> <b>Bold</b></h1>
            <div filterable-group="true">
                <p>Paragraf filterable</p>
                <i>Kaka Kelas</i> <b>Bolder problem</b>
                <p>Testing paragraf filterable</p>
            </div>
            <div>
              <FilterableGroup>
                <i>Kaka Kelas</i> <b>Bolder problem</b>
              </FilterableGroup>
            </div>
            <h1>Kereta <b>Kuda</b></h1>
            <h1>Kadal Mekar</h1>
            <span>
              <p>Janganlah kesana kemari</p>
              <p>Janganlah kesana <i>kemari</i></p>
            </span>
          </div>
        </FilterableContent>
      </div>
    )
  }
}
