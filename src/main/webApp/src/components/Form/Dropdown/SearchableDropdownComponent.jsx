import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import FormControlComponent from '../FormControlComponent'

export default class SearchableDropdownComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
  }

      handleSearchChange = (fieldId, value) => {
        const { onChange } = this.props
        if (onChange && value.trim()) {
          onChange(fieldId, value)
          this.setState({ value })
        } else {
          this.setState({ value: null })
        }
      }

      clearList = () => {
        const { clearList } = this.props
        if (clearList) {
          clearList()
        }
        this.setState({ value: null })
      }

      render = () => {
        const {
          label, fieldId, required, errorMessage, list,
        } = this.props
        const { value } = this.state
        return (
          <Fragment>
            <FormControlComponent
              label={label}
              fieldId={fieldId}
              value={value}
              required={required}
              colSize={[3, 3]}
              onChange={this.handleSearchChange}
              errorMessage={errorMessage}
            >
              <input id='airport' onClick={this.clearList} type='text' list='list' />
            </FormControlComponent>
            <datalist id='list'>
              {list}
            </datalist>
          </Fragment>
        )
      }
}

SearchableDropdownComponent.propTypes = {
  label: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  required: PropTypes.bool,
  list: PropTypes.arrayOf.isRequired,
  errorMessage: PropTypes.string,
  clearList: PropTypes.func,
  onChange: PropTypes.func.isRequired,
}

SearchableDropdownComponent.defaultProps = {
  required: false,
  errorMessage: '',
  clearList: null,
}
