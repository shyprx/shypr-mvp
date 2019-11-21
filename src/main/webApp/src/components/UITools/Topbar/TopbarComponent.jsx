import React from 'react'
import { translate } from 'react-i18next'
import './Topbar.css'
import i18n from '../../../i18n'

const TopbarComponent = () => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }
  return (
    <div className='lang-switch  fadeInDown animate'>
      <button
        className='rmButton'
        type='button'
        onClick={() => changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
      >
        {i18n.language === 'ar' ? 'English' : 'العربية'}
      </button>
    </div>
  )
}

export default translate('translations')(TopbarComponent)
