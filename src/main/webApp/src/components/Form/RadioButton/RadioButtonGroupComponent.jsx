import React from 'react'
import PropTypes from 'prop-types'
//import './RadioButton.css'
import '../Label.css'

export default class RadioButtonGroupComponent extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  render() {
    const { radioItems, groupName } = this.props
    return (
      <div className='form-group row'>
        <label className='col-md-2 col-form-label'>
          {groupName}
        </label>
        <div className='col-md-10'>
          {
            radioItems.map(radio => (
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  id={radio.id}
                  name={groupName}
                  type='radio'
                  value={radio.id}
                  onChange={this.onChange}
                  checked={radio.checked}
                />
                <label className='form-check-label' htmlFor={radio.id}> {radio.value} </label>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
RadioButtonGroupComponent.propTypes = {
  radioItems: PropTypes.array.isRequired,
  groupName: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}
