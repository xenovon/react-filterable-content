---
id: documentation
title: Documentation
sidebar_label: Docs
---

## How It's Work

This library work by tapping the component's rendering, going through the component hierarchy to find the matching keyword, give highlight styling to the matching text and only render the one that has matching text.

## Getting Started

### Install

* **Using NPM**

  ```bash
  npm install --save react-filterable-content
  ```

* **Using Yarn**
  ```bash
  yarn add react-filterable-content
  ```

### Test

* **Run Test**

  ```bash
  npm run test
  ```

* **Run test with coverage report**

  ```bash
  npm test -- --coverage
  ```

## Basic Usage

* **FilterableContent**

  This is main building block for this library. We should wrap the content that need to be filtered in this component. 

* **FilterableSection**

  This is component

## Config and Customize Filter Behaviour
There is some configuration that can affect the filter behaviour. Below is the default configuration for the FilterEngine. 

```
  {
    maxCache: 30, 
    highlightResult: true,
    caseSensitive: false,
    highlightStyle: {
      background: '#fff542',
      display: 'inline',
      padding: '2px 0'
    }
  }
```

* *maxCache* - Every search result will be cached in memory, this config is to configure how many search result keeped in the memory. 
* *highlightResult* - Set whether the found keyword should be highlighted or not. You can set this as false to make the searching faster.
* *caseSensitive* - Set true if you want the searching is case sensitive
* *highlightStyle* - Styling for the highlight, you can change the color, opacity, and other detail in here. The style should be plain css object. 

To override the configuration, you can pass config object as props in FilterableContent component.

You can also add specific props to the components to instruct the Filter Engine about what to do with those components. Props that available are: 

* *filterable-sticky* - It will make sure the component always be displayed, although they don't have the matched keyword. This props can be useful for title component or layout related components.
* *filterable-group* - To group the components. It's useful for component that consist of several child component and we want display all part of the components if there any matching keyword inside the child component. Without this flag, Filter engine will only display the child that have matching keyword.
* *filterable-ignore* - If components has this props, then Filter engine will ignore this component. It will not count as result despite the component has the keyword.

## Example

### Basic Example

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

### More Advanced Example





