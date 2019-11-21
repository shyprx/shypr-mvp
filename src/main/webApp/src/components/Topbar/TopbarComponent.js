import React from 'react'
import PropTypes from 'prop-types'
import './Topbar.css'


const TopbarComponent = ({locale, onLocaleClick}) => (
  <div className='lang-switch  fadeInDown animate'>
          <a href='/'
            onClick={e => {
              e.preventDefault()
              onLocaleClick(locale === 'ar' ? 'en':'ar')
            }
          }>
            {locale === 'ar' ? 'English' : 'العربية'}
          </a>
  </div>
)

TopbarComponent.propTypes = {
  locale: PropTypes.string.isRequired,
  onLocaleClick: PropTypes.func.isRequired,
  //user: PropTypes.object,
}

export default TopbarComponent
