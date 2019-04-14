import React, { Component } from 'react'

import { FilterableContent } from 'react-filterable-content'

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
    let { keyword } = this.state;
    console.log(keyword);

    return (
      <div style={{display:'flex', flexDirection:'column',margin:'40px'}}>
        <input
          type={'text'}
          value={keyword}
          style={{marginBottom:'40px'}}
          placeholder={'input keyword'}
          onChange={this.onChange}
        />

        {keyword && <p>{`Content that has "${keyword}" keyword`}</p>}

        <FilterableContent keyword={keyword}>
          <p>Adnan</p>
          <p>Isi konten 2 phoenik</p>
          <p>Isi kontent anu anu</p>
          <ul>
            <li>Test teta 1</li>
            <li>Test beta 2</li>
            <li>Test mata 3</li>
          </ul>
          <div>
            <h1>Judul 1</h1>
            <h1>Mata-mata</h1>
            <h1>Mata-mata</h1>
            <h1>Mata-mata</h1>
          </div>
        </FilterableContent>
      </div>
    )
  }
}
