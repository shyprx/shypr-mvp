
import React from 'react'
import { Trans , translate } from 'react-i18next'


const WizardStopComponent = (props) => {

    let classes = "nav-item "   ;
    if(props.status === 'DONE' )  classes += ' done' ;
    if(props.status === 'ACTIVE' )  classes += ' active' ;

    return (
         <li class={classes} >
             <a class="nav-link" >  <Trans i18nKey={props.title} /></a> 
          </li>
    )

  }
  
  export default translate('translations')(WizardStopComponent)