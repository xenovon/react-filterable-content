import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FilterEngine } from '../utils'

export class FilterableContent extends PureComponent {
  static propTypes = {
    keyword: PropTypes.string,
    children: PropTypes.node,
    config: PropTypes.shape({
      cacheMode: PropTypes.oneOf(['none', 'memory', 'localStorage']),
      maxCache: PropTypes.number
    })
  }

  constructor(props) {
    super(props)
    let { config } = this.props
    this.filterEngine = new FilterEngine(config)
  }

  render() {
    let { keyword, children } = this.props
    return this.filterEngine.filterChildren({keyword, children})
  }
}
