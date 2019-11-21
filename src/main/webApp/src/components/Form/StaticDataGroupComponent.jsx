import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './StaticData.css'

/**
  label: the label of the value to be shown
  value: the actual value to be rendered
*/
const StaticDataGroupComponent = ({ children }) => {
  const containerClassNames = classnames(
    'staticContainer',
    'form-group',
  )
  return (
    <div className="row form-group">
      {children}
    </div>
  )
}

StaticDataGroupComponent.propTypes = {
  children: PropTypes.node.isRequired,
}

export default StaticDataGroupComponent
