import React from 'react'
import PropTypes from 'prop-types'
import './Modal.css'

const ModalFooterComponent = ({children}) => {
  return (
    <div className={'permitModalFooter'}>
      {children}
    </div>
  )
}

ModalFooterComponent.propTypes = {
  children: PropTypes.any.isRequired
}

export default ModalFooterComponent
