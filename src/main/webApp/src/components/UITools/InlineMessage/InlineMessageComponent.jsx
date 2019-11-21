import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './InlineMessage.css'

const InlineMessage = ({ message, type, inTitleSection }) => {
  const classNames = type === 'uploadError' ? 'uploadError' : classnames('alert', {
    'alert-danger': type === 'error',
    'alert-info': type === 'info',
    'alert-success': type === 'success',
    'alert-warning': type === 'warn',
    inTitleSection,
  })

  return (
    message ? (
      <p ky="inlineMessageComp" id='errMsgComp' data-msgtype={type} className={classNames}>
        {message}
      </p>
    ) : null
  )
}

InlineMessage.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  type: PropTypes.oneOf(['info', 'error', 'success', 'warn', 'uploadError']),
  inTitleSection: PropTypes.bool 
}
InlineMessage.defaultProps = {
  message: null,
  type: 'info',
  inTitleSection:false
}

export default InlineMessage
