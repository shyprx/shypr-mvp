/**
 * @Author: moalsabih
 * @Date:   21-11-2017
 * @Project: GACA - PERMITS
 * @Last modified by:
 * @Last modified time: 06-12-2017
 */



 import React from 'react'
 import PropTypes from 'prop-types'
 import './ToggleSwitch.css'

 export default class ToggleSwitchComponent extends React.Component{
   constructor(props){
     super(props)
     
     this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
   }

handleCheckboxChange(event) {
    this.props.onChange(event)
}
   render(){
     const {item} = this.props
      return(
             <div>
               <label className="switch">
                  <input type="checkbox" value={item.id} checked={item.status =='ACTIVE' ? true : false} onChange={this.handleCheckboxChange}/>
                  <span className="slider round"></span>
              </label>
            </div>
     )
   }
 }


 ToggleSwitchComponent.propTypes={
    onChange:PropTypes.func,
 }
