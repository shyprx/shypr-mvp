import React from 'react'
import './Loader.css'

export default class LoaderComponent extends React.Component {
  render(){
    return(
      <div className='progressBar'>
        <div className='indeterminate'>
        </div>
      </div>
    )
  }
}
