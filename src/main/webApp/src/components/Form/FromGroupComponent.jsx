import React from 'react'
import PropTypes from 'prop-types'
import './FormGroup.css'

export default class FormGroupComponent extends React.Component {
  render() {
    return (
      <div className='form-group row'>
        {this.props.children}
      </div>
    )
  }
}

FormGroupComponent.propTypes = {
  children: PropTypes.node.isRequired // TODO check the type of a child
}
