
import React from 'react'
import { Trans , translate } from 'react-i18next'


const WizardComponent = (props) => {
    return (
        <ul class="nav nav-pills nav-justified wizard"> 
              {props.children}
        </ul>
    )
  }
  
  export default translate('translations')(WizardComponent)