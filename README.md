# react-filterable-content

<p align="center">
  <img src="https://badgen.net/npm/v/react-filterable-content" alt="">
  <img src="https://badgen.net/badge/license/MIT/blue" alt="">
  <img src="https://badgen.net/npm/dt/react-filterable-content" alt="">
</p>

## Working Example

[http://filterable.adnanhidayat.com](http://filterable.adnanhidayat.com)

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

  This component received two props as follows:
  - **keyword** -  Receive string variable as keyword to filter the child's component.
  - **config** - Receive javascript object contain configuration for the Filter Engine. See *Configuration* section for more detail.

  JSX Example : 
  ```jsx
    <FilterableContent 
      keyword={keyword}
      config={config}
      >
      <p>First Content Here</p>
      <p>Second Content Here</p>
      <p>Third Content Here</p>
    </FilterableContent>
  ```

* **FilterableSection**

  Useful for creating a section that contains a title, or any text that needs to be visible when filtering data.

  FilterableSection has the same function with filterable-sticky flag. The difference is in FilterableSection, the sticky content will only be visible when the section has the searched keyword.  Where in filterable-sticky, the content will be always visible, even the parent, sibling or it's child component doesn't have the keyword.

  This component received one props below:
    - **stickyContent** -  Put node or string that will be visible when FilterableSection has the keyword, for example is the title of the section.

    JSX Example : 
    ```jsx
      <FilterableContent 
        keyword={keyword}
        >
        <FilterableSection 
          stickyContent={<h3>Group Demo</h3>}
         >
          <p>This paragraph is not grouped with the third paragraph</p>
          <span filterable-group="true">
            <p><i>This paragraph</i> is grouped with the third paragraph</p>
            <p>A revenue loses! The owed break refreshes software. Programming weighs the forest. On top of the institute dresses software. Software negates programming into its isolate blessed. The aardvark bells programming over a portrayed biology.</p>
          </span>
        </FilterableSection>
      </FilterableContent>
    ```


## Config and Customize Filter Behaviour
### Configuration
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

* ***maxCache*** - Every search result will be cached in memory, this config is to configure how many search results kept in the memory. 
* ***highlightResult*** - Set whether the found keyword should be highlighted or not. You can set this as false to make the rendering faster. Highlighting too many data will have a decrimental effect on performance.
* ***caseSensitive*** - Set true if you want the searching is case sensitive
* ***highlightStyle*** - Styling for the highlight, you can change the color, opacity, and other detail in here. The style should be plain CSS-in-js object. 

To override the configuration, you can pass the config object as props in FilterableContent component.

### Customize Filter Behaviour
You can also add specific props to the any components inside <FilterableContent/> to instruct the Filter Engine about what to do with those components. Props that available are: 

* ***filterable-sticky*** - It will make sure the component always be displayed, although they don't have the matched keyword. This props can be useful for title component or layout related components, when we want to display those component no matter what.
* ***filterable-group*** - To group the components. It's useful for a component that consists of several child components, and we want to display all part of the components if there any matching keyword inside the child component. Without this flag, the Filter engine will only show the child that has the matching keyword.
* ***filterable-ignore*** - If components have this props, then Filter engine will ignore this component. It will not count as a result although the component has the keyword.
* ***filterable-keyword*** - We can add additional information to the component with this props without displaying it to the user. The Filter Engine will display the component if the content of keyword props matched with the search input.

You can see how to apply the props above in example folder.

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
          <h1 filterable-sticky='true'>
            First Content Here
          </h1>
          <p>First Content Here</p>
          <p>Second Content Here</p>
          <p filterable-keyword='Keyword for third content'>
            Third Content Here
          </p>
          <div filterable-group='true'>
            <p>Content 1 in group</p>
            <p>Content 2 in group</p>
            <p filterable-ignore='true'>Ignored content</p>
          </div>
        </FilterableContent>
      </div>
    )
  }
}
```

### Advanced Example

You can get more advanced example in 'example' folder.

## License

MIT © [adnanhidayat](https://github.com/xenovon)
