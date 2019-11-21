import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export default class DropdownComponent extends React.Component {
    constructor(props){
        super(props)
      }

      handleSearchChange = (fieldId, value) => {
          
      } 

      render = () => {
          return(
              <Fragment>
                <FormControlComponent
                    label={<FormattedMessage id={this.props.label} />}
                    fieldId={this.props.fieldId}
                    value={this.state.airport}
                    required={this.props.required}
                    colSize={[3,3]}
                    onChange={this.handleSearchChange}
                    errorMessage={'ss'}>
                    <input id='airport' onClick={this.clearList} type='text' list='airports'/>
                    </FormControlComponent>
                <datalist id='airports'>
                    {tmp}
                </datalist>
            </Fragment>
        )
      }
}

DropdownComponent.propTypes = {
    label: PropTypes.string.isRequired,
    fieldId: PropTypes.string.isRequired,
    required: PropTypes.bool,
    listSearch: PropTypes.func


}
