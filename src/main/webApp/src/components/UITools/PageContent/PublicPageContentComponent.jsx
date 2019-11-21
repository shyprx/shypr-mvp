import React from 'react'
import PropTypes from 'prop-types'
import './PageContent.css'

const PublicPageContentComponent = (title, children) => (
  <div className='col-12  col-lg-12'>
    <div className='page-header' id='pageHeader'>
      <h1>
        {title}
      </h1>
    </div>
    <div className='pageContent Shadow-z5' id='pageContent'>
      {children}
    </div>
  </div>
)

PublicPageContentComponent.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  children: PropTypes.node,
  routes: PropTypes.array,
}

export default PublicPageContentComponent
