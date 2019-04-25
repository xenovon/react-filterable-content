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
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}
