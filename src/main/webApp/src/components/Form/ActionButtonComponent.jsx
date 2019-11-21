import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './ActionButton.css'

const actionButtons = {
  'View': {class: 'view', tooltip: 'View'},
  'Edit': {class: 'edit', tooltip: 'Edit'},
  'Delete': {class: 'delete', tooltip: 'Delete'},
  'Lock': {class: 'lock', tooltip: 'Lock'},
  'Unlock': {class: 'unlock', tooltip: 'Unlock'},
  'Pdf': {class: 'pdf', tooltip: 'Pdf'},
  'Excel': {class: 'excel', tooltip: 'Excel'},
  'Play': {class: 'play', tooltip: 'Play'},
  'Pause': {class: 'pause', tooltip: 'Pause'},
  'aprove': {class: 'aprove', tooltip: 'aprove'},
  'reject': {class: 'reject', tooltip: 'reject'},
  'security': {class: 'security', tooltip: 'security'},
  'tranfer': {class: 'tranfer', tooltip: 'tranfer'}
}

const ActionButtonComponent = (props) => {

  const actionButton = actionButtons[props.type]
  const className = classnames('action', actionButton.class)
  return (
    <a id={actionButton.tooltip} className={className} onClick={props.onClick} title={props.hint}></a>
  )
}

ActionButtonComponent.propTypes = {
  type: PropTypes.oneOf(
    ['View', 'Edit', 'Delete', 'Lock','Unlock', 'Pdf', 'Excel', 'Play', 'Pause','aprove','reject','security','tranfer']
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  id:PropTypes.string,
  iconStyle: PropTypes.string,
  hint:PropTypes.string
}

export default ActionButtonComponent
