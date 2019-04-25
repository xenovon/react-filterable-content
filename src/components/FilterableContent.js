import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { FilterEngine } from '../utils'

export class FilterableContent extends PureComponent {
  static propTypes = {
    keyword: PropTypes.string,
    children: PropTypes.node,
    config: PropTypes.shape({
      maxCache: PropTypes.number,
      localStoragePrefix: PropTypes.string,
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
