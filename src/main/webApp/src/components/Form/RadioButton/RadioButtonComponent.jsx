import React from 'react'
import PropTypes from 'prop-types'
//import './RadioButton.css'
import '../Label.css'

export default class RadioButtonComponent extends React.Component {
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
    const { id, groupName, defultValue } = this.props
    return (
      <div key={id} className="form-group row">
        <label className="col-md-2 col-form-label"> {groupName} </label>
        <div className="col-md-10">
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="gridRadios" id={id} name={groupName} value={id} onChange={this.onChange} defaultChecked={defultValue} />
            <label className="form-check-label" htmlFor={id}> {id} </label>
          </div>
        </div>
      </div>
      // <fieldset>
      //   <div key={id} className='form-check form-check-inline'>
      //     <input
      //       id={id}
      //       name={groupName}
      //       type='radio'
      //       className='form-check-input'
      //       value={id}
      //       onChange={this.onChange}
      //       defaultChecked={defultValue}
      //     />
      //     <label className='form-check-label' htmlFor={id} />
      //   </div>
      // </fieldset>
    )
  }
}
RadioButtonComponent.propTypes = {
  id: PropTypes.number.isRequired,
  groupName: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  defultValue: PropTypes.bool,
}
