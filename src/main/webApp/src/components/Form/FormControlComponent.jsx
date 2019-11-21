import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
//import './Label.css'
import './FormGroup.css'
export default class FormControlComponent extends React.Component {

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onEnterKeyPress = this.onEnterKeyPress.bind(this)
  }
  
  getError() {
    if(this.props.errorMessage) {
      return(
        <div id='formErrMsg' className='error'>
          {this.props.errorMessage}
        </div>
      )
    }
    return null
  }

  onChange(event) {
    console.log("event",event);
    console.log("target",event.target);
    
    
    if(this.props.onChange){
      this.props.onChange(event.target.id, event.target.value)
    }
  }
  onKeyUp(event) {
    if(this.props.onKeyUp){
      this.props.onKeyUp(event.target.id, event.target.value)
    }
  }
  onEnterKeyPress(event) {
    if(this.props.onEnterKeyPress) {
      if(event.key === 'Enter') {
        this.props.onEnterKeyPress()
      }else{
        this.props.onEnterKeyPress(event.target.id, event.target.value)
      }
    }
  }

  render() {
    // var size = this.props.size
    var colSize = this.props.colSize
    
    let labelSize = 'col-md-2'
    let fieldSize = 'col-md-10'
    if(colSize && colSize.length === 2) {
      labelSize = `col-md-${colSize[0]}`
      fieldSize = `col-md-${colSize[1]}`
    }
    var labelClassName = classnames(labelSize, 'col-form-label required', 
      {
        //'required': this.props.required
      }
    )

    var fieldClassName = classnames('form-control',
      {
        //'hasError': this.props.errorMessage
      }
    )

    var fieldContainerClassName = classnames(fieldSize)

    var fieldId = this.props.fieldId
    var child = React.Children.only(this.props.children)
    var fieldChild = React.cloneElement(
      child, {
        className: fieldClassName,
        id: fieldId,
        value: this.props.value || '',
        onChange: this.onChange,
        onKeyUp:this.onKeyUp,
        onKeyPress: this.onEnterKeyPress // ToDo current the support if for Enter key, You may change when necessary
      }
    )
    const Fragment = React.Fragment
    return (
      <Fragment>
        {this.props.label?
          <label className={labelClassName}>
            {this.props.label}
          </label>:null}
        <div className={fieldContainerClassName}>
          {/* {this.props.isMobile ?
            <div className="input-group changeDirection">
              <span className="input-group-addon selver">+966</span>
              {fieldChild}
            </div>
            : fieldChild } */}
            {fieldChild}
          {this.props.helpMessage?
            <span className='help'>
              {this.props.helpMessage}
            </span>
            :null}
            <span className='error'>
          {this.getError()}</span>
        </div>
      </Fragment>
    )
  }
}

/**
 * colSize, dependes on bootstrap grip system
 *
 * @type {Object}
 */
FormControlComponent.propTypes = {
  children: PropTypes.node.isRequired,
  errorMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  helpMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  fieldId: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  required: PropTypes.bool,
  colSize: PropTypes.array,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  onEnterKeyPress: PropTypes.func,
  locale: PropTypes.string,
}

FormControlComponent.defaultProps={
  isMobile: false,
}
