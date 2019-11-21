import React from 'react'
import PropTypes from 'prop-types'
import './CheckboxButton.css'
import { AR } from '../../../constants/LocaleConstants'

export default class CheckboxButtonGroupComponent extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  handleLinkClick(id) {
    this.props.handleLinkClick(id)
  }

  render() {
    const { checkboxItems } = this.props
    return (
      <fieldset>
        {
          checkboxItems.map(checkbox => (
            <div key={checkbox.id} className={checkbox.show ? 'checkboxItem form-check-inline':'permitCheckboxButtonHidden'} >
              <input id={checkbox.id} type='checkbox' className='form-check-input' value={checkbox.id} onChange={this.onChange} checked={checkbox.checked} />
              <label className='form-check-label' htmlFor={checkbox.id}>{this.props.withNumber ? <span className=''>{checkbox.number}</span> : null}
                <span className=''>{this.props.locale === AR ? checkbox.nameAr : checkbox.nameEn}</span>
              </label>
              <a id={checkbox.id} className='pointer' onClick={this.handleLinkClick.bind(this,checkbox.id)}>{checkbox.linkLabel}</a>
            </div>
            ))
        }
      </fieldset>
    )
  }
}

CheckboxButtonGroupComponent.propTypes = {
  checkboxItems: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  locale: PropTypes.string.isRequired,
  withNumber: PropTypes.bool,
  handleLinkClick: PropTypes.func,
}
