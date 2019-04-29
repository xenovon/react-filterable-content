import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { FilterEngine, debounceRender } from '../utils'

class FilterableContentClass extends PureComponent {
  static propTypes = {
    keyword: PropTypes.string,
    children: PropTypes.node,
    config: PropTypes.shape({
      maxCache: PropTypes.number,
      displayPerformanceLog: PropTypes.bool,
      highlightResult: PropTypes.bool,
      caseSensitive: PropTypes.bool,
      highlightStyle: PropTypes.object
    })
  }

  constructor(props) {
    super(props)
    let { config } = this.props
    this.filterEngine = new FilterEngine(config)
  }

  render() {
    let { keyword, children } = this.props
    return this.filterEngine.filterChildren({keyword, children}) || <Fragment/>
  }
}

export const FilterableContent = debounceRender(FilterableContentClass, 110)