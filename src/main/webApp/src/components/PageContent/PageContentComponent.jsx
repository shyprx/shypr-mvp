import React from 'react'
import PropTypes from 'prop-types'
import './PageContent.css'

export default class PageContentComponent extends React.Component {
  render() {
    return (
      <div className='col-12  col-lg-9'>
        <div className='page-header' id='pageHeader'>
          <h1>
            {this.props.title}
          </h1>
        </div>
          <div className='pageContent Shadow-z5' id='pageContent'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

PageContentComponent.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  children: PropTypes.node,
  routes: PropTypes.array,
}