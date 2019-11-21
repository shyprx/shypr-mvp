import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './InlineMessage.css'

const InLineMessageSpanComponent = ({ message, type, inTitleSection }) => {
  const classNames = type === 'uploadError' ? 'uploadError' : classnames('alert', {
    'alert-danger': type === 'error',
    'alert-info': type === 'info',
    'alert-success': type === 'success',
    'alert-warning': type === 'warn',
    inTitleSection,
  })

  return (
    message ? (
      <div ky="inlineMessageComp" id='errMsgComp' data-msgtype={type} className={classNames}>
        {message}
      </div>
    ) : null
  )
}

InLineMessageSpanComponent.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  type: PropTypes.oneOf(['info', 'error', 'success', 'warn', 'uploadError']),
  inTitleSection: PropTypes.bool 
}
InLineMessageSpanComponent.defaultProps = {
  message: null,
  type: 'info',
  inTitleSection:false
}

export default InLineMessageSpanComponent
