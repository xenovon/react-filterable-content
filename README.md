# react-filterable-content

[![NPM](https://img.shields.io/npm/v/react-filterable-content.svg)](https://www.npmjs.com/package/react-filterable-content) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This is a beta version, currently still need more testing, refactoring and improvement. I do not recommend this for production use.

## Install

```bash
npm install --save react-filterable-content
```

## Test 

Run Test

```bash
npm run test
```

Run test with coverage report

```bash
npm test -- --coverage
```

## Usage

### Basic Usage

```jsx
import React, { Component } from 'react'
import { FilterableContent } from 'react-filterable-content'

export default class Example extends Component {

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
      <div>
        <input
          type={'text'}
          value={keyword}
          placeholder={'input keyword'}
          onChange={this.onChange}
        />

        <FilterableContent 
          keyword={keyword}
          >
          <p>First Content Here</p>
          <p>Second Content Here</p>
          <p>Third Content Here</p>
        </FilterableContent>
      </div>
    )
  }
}
```


### More Advanced Usage

*TODO*


## License

MIT © [adnanhidayat](https://github.com/xenovon)
