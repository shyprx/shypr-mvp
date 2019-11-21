
import React from 'react'
import { Trans  } from 'react-i18next'


 const ViewDetailsCardComponent = (props) => {
    const title = (
        <h5>
          <Trans i18nKey={props.title} />
        </h5>
      )
  
      return (
        <div className="animate fadeInRightLight delay1"  >
          {title}
          <div className="card card-outline-default mb-4 boxsu-details bg-light">
            <div className="card-body form-group-static">
                  {props.children}
            </div>
          </div>
        </div>
      )

}    

export default ViewDetailsCardComponent ;