import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import FormControlComponent from '../Form/FormControlComponent'

export default class SearchRegistirationComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFields: "",
    }
    this.onBasicSearchValueChange = this.onBasicSearchValueChange.bind(this)
  }
  onBasicSearchValueChange(id, value) {
    if (/^[a-zA-Z0-9\u0621-\u064A\u0660-\u0669\s]*$/g.test(value)) {
      this.setState(
        {
          ...this.state,
          searchFields: value,
        })
    }
  }
  render() {
    return (
      <div>
        <FormControlComponent
        label={<FormattedMessage id='searchFor' />}
        fieldId='search'
        value={this.state.searchFields}
        colSize={[2, 4]}
        onChange={this.onBasicSearchValueChange}
    >
        <input  type='text' />
    </FormControlComponent>
    </div>
  )
}
}

SearchRegistirationComponent.propTypes = {
}
