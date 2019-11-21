import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Subtitle.css'

const SubtitleComponent = (props) => {
  const className = classnames({
    subtitle: true,
    first: props.isFirst
  })
  return (
    <div>
      <h4 className='col-12'>{props.title}</h4>
      {props.children}
    </div>
  )
}

SubtitleComponent.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]).isRequired,
  isFirst: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
  ])
}

export default SubtitleComponent
