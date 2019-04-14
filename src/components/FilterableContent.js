import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { filterChildren } from '../utils'

export class FilterableContent extends PureComponent {
  static propTypes = {
    keyword: PropTypes.string,
    children: PropTypes.node,
    isCached: PropTypes.bool
  }

  static defaultProps = {
    isCached: true
  }

  constructor(props) {
    super(props)
    this.state = {
      children: props.children
    }
  }

  render() {
    return filterChildren(this.props)
  }
}
