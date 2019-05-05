import React from 'react'
import PropTypes from 'prop-types'

export const FilterableSection = props => {
  let { stickyContent, children, ...passingProps } = props

  return (
    <section { ...passingProps }>
      {stickyContent}
      {children}
    </section>
  )
}

FilterableSection.propTypes = {
  children: PropTypes.node,
  stickyContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}
