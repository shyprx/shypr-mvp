import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './StaticData.css'
import './Label.css'
import './Button.css'
import { FormattedDate, FormattedMessage } from 'react-intl';

const StaticAttachmentComponent = ({label, value, colSize, hasLink,id}) => {
  let labelColSize = 'col-md-2'
  let valueColSize = 'col-md-10'
  if(colSize && colSize.length === 2) {
    labelColSize = `col-md-${colSize[0]}`
    valueColSize = `col-md-${colSize[1]}`
  }
  const labelClassNames = classnames('formLabel',
    labelColSize,
    'col-sm-3'
  )

  const btnClassNames = classnames('button','smallButton')
  const valueClassNames = classnames(valueColSize, 'col-sm-9')
  const viewButtonClassNames = classnames('fa fa-eye','staticViewButton') 
  return (
    <div key={id}>
      {label ? <label  className={labelClassNames}>{label}</label>:null}
      <div className={valueClassNames}>
        <a id={id} className={btnClassNames} href={hasLink} role="button"><i className={viewButtonClassNames}></i><span><FormattedMessage id='view'/></span></a>
      </div>
    </div>
  )
}

StaticAttachmentComponent.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  colSize: PropTypes.array,
  hasLink: PropTypes.string,
  id:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default StaticAttachmentComponent
