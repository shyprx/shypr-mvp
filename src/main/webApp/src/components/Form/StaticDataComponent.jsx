import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import './StaticData.css'
import './Label.css'

const StaticDataComponent = ({
  label, value, colSize, hasLink, onChange, linkMessage, id, dashed,
}) => {
  let labelColSize = 'col-md-2'
  let valueColSize = 'col-md-10'
  if (colSize && colSize.length === 2) {
    labelColSize = `col-md-${colSize[0]}`
    valueColSize = `col-md-${colSize[1]}`
  }
  const labelClassNames = classnames('col-form-label',
    labelColSize,
    'col-sm-3')
  const dashPos = dashed ? 'dashedPostion' : ''
  const valueClassNames = classnames(valueColSize, dashPos)
  return (
    <div id='staticdata' className='staticDisplay'>
      <label className={labelClassNames}>
        {label}
      </label>
      <div className={valueClassNames}>
        <span className={'form-control-plaintext ' + (dashed ? ' dashIt' : null)}>
          {value}
        </span>
        {hasLink ? (
          <span>
            <br />
            <Link id={id} style={{cursor: 'pointer'}} onClick={() => onChange()}>{linkMessage}</Link>
          </span>
        ) : null}
      </div>
    </div>
  )
}

StaticDataComponent.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  colSize: PropTypes.array,
  hasLink: PropTypes.bool,
  linkMessage: PropTypes.object,
  id: PropTypes.string,
  onChange: PropTypes.func,
  dashed: PropTypes.bool,
}

export default StaticDataComponent
