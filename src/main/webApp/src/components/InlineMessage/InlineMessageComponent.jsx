import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './InlineMessage.css'

const InlineMessage = ({message, type}) => {
  const classNames = classnames('inlineMessage', {
    'inlineError': type === 'error',
    'inlineInfo': type === 'info',
    'inlineSuccess': type === 'success',
    'inlineWarn': type === 'warn',
    'uploadError': type === 'uploadError'
    
  })

  return (
    message ? <p id='errMsgComp' data-msgtype={type} className={classNames}>{message}</p> : null
  )
}

InlineMessage.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  type: PropTypes.oneOf(['info', 'error', 'success', 'warn', 'uploadError'])
}

export default InlineMessage
