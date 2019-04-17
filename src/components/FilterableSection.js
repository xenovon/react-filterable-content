import React from 'react'
import PropTypes from 'prop-types'

export const FilterableSection = props => {
  let { title, description, children } = props
  return (
    <section>
      {title}
      {description}
      {children}
    </section>
  )
}

FilterableSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}
