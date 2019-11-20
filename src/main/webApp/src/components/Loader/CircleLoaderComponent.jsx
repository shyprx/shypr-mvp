import React from 'react'
import './Circle.css'

export default class LoaderComponent extends React.Component {
  render(){
    return(
        <div>
            <div id="circle-rotation" class="circle"></div>
            <div id="circle-2-rotation" class="circle-2"></div>
        </div>
    )
  }
}
