import React from 'react'
import './Loader.css'

export default class LoaderComponent extends React.Component {
  render() {
    return (
      <div className="overlay">
        <div className="overlay__inner">
          <div className="overlay__content"><span className="spinner"></span></div>
        </div>
      </div>
    )
  }
}
