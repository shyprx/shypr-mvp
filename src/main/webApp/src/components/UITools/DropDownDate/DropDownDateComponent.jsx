import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import DateDropDownsComponent from './DateDropDownsComponent'

export default class DropDownDateComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.state = {
      isHijri: this.props.isHijri,
      isEnable: this.props.isEnable,

    }
  }

  getError() {
    if (this.props.errorMessage) {
      return (
        <div id='formErrMsg' className="error">
          {this.props.errorMessage}
        </div>
      )
    }
    return null
  }

  handleDateChange(date) {
    if (this.props.onChange) {
      this.props.onChange(date ,  this.props.fieldId)
    }
  }

  render() {
    // var size = this.props.size
    const colSize = this.props.colSize
    let labelSize = 'col-md-2'
    let fieldSize = 'col-md-10'
    if (colSize && colSize.length === 2) {
      labelSize = `col-md-${colSize[0]}`
      fieldSize = `col-md-${colSize[1]}`
    }
    const labelClassName = classnames(
      'col-form-label', labelSize, 'col-sm-3',
      {
        required: this.props.required,
      },
    )

    const fieldClassName = classnames(
      'field', 'form-control',
      {
        hasError: this.props.errorMessage,
      },
    )

    const fieldContainerClassName = classnames(fieldSize)

    const child = (
      <DateDropDownsComponent
        onDateSelect={this.handleDateChange}
        dateIsolator={this.props.dateIsolator}
        isEnable={this.props.isEnable}
        ComponentType={this.props.ComponentType}
        isHijri={this.props.isHijri}
        onCascadeDate={this.props.onCascadeDate}
        currentvalue={this.props.value}
        locale={this.props.locale}
        birth={this.props.birth}
        hijriOnly={this.props.hijriOnly}
        allYears={this.props.allYears}
      />
    )
    const fieldChild = React.cloneElement(child, {
      className: fieldClassName,
      value: this.props.value || '',
    })

    return (
      <div className="col-md-6">
        {this.props.label
          ? (
            <label className={labelClassName}>
              {this.props.label}
            </label>
          ) : null}
        <div className={fieldContainerClassName}>
          {fieldChild}
          {this.props.helpMessage
            ? (
              <span className="help">
                {this.props.helpMessage}
              </span>
            )
            : null}
          {this.getError()}
        </div>
      </div>
    )
  }
}

/**
 * colSize, dependes on bootstrap grip system
 *
 * @type {Object}
 */
DropDownDateComponent.propTypes = {
  errorMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  helpMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  fieldId: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  required: PropTypes.bool,
  colSize: PropTypes.array,
  onChange: PropTypes.func,
  locale: PropTypes.string.isRequired,
  dateIsolator: PropTypes.string,
}
DropDownDateComponent.defaultProps = {
  dateIsolator: '-',
}
