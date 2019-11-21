
import React from 'react'

import { Link } from 'react-router-dom'
import InlineMessageComponent from '../UITools/InlineMessage/InlineMessageComponent'
import Loader from '../UITools/Loader/LoaderComponent'
import { Trans  } from 'react-i18next'

const ViewDetailsFooterActions = (props) => {
    const { isLoader , generalError , errorId , viewPrint ,backUrl , saveBtn } = props ;

    return (
      <div className='pageActions'>
        {isLoader ? <Loader /> : null}

        { generalError ? (  <InlineMessageComponent  message={<span><Trans i18nKey={errorId} /></span>}   type='error'   />   ) : null}
       
        { viewPrint  &&
                <button className='btn btn-primary' type='button' onClick={ () => props.downloadFile() } disabled={isLoader}>
                  <Trans i18nKey='print' />
                </button>  }

        {props.children}

        {props.saveBtn &&  <button className='btn btn-primary'  onClick={() => props.saveFN() }>
          <Trans i18nKey={saveBtn} />
        </button>}          

        <Link to={backUrl}>
          <button className='btn btn-secondary' type='button' onClick={() => props.takeMeHome()}>
            <Trans i18nKey='back' />
          </button>
        </Link>
      </div>
    )

}

export default ViewDetailsFooterActions 