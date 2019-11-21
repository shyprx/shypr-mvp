import React from 'react'
import PropTypes from 'prop-types'
//import './CheckboxButton.css'
//import '../Form/Label.css'
//import { AR } from '../../constants/LocaleConstants'

export default class CheckboxButtonGroupComponent extends React.Component {
  onChange = (event) => {
    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  handleLinkClick(id) {
    this.props.handleLinkClick(id)
  }

  render() {
    const { checkboxItems, label } = this.props    
    return (
      <div className="form-group row">
        <label className="col-md-2 col-form-label"> {label} </label>
        <div className="col-md-10">
          {
            checkboxItems.map(checkbox => (
              <div key={checkbox.id} className="form-check form-check-inline">
                <input className="form-check-input" id={checkbox.id} type='checkbox' value={checkbox.id} onChange={this.onChange} checked={checkbox.checked} />
                <label className="form-check-label" htmlFor={checkbox.id}>
                  {this.props.withNumber ? (
                    <span className='choiceID'>
                      {checkbox.number}
                    </span>
                  ) : null}
                  {this.props.locale === 'ar' ? checkbox.nameAr : checkbox.nameEn}
                </label>
              </div>
            ))
          }
        </div>
      </div>
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
