import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './ActionButton.css'

const actionButtons = {
  // To Do : Need to add classes as font awesome
  View: { class: 'fas fa-eye', tooltip: 'View' },
  Edit: { class: 'fa fa-pencil', tooltip: 'Edit' },
  Delete: { class: 'fa fa-trash', tooltip: 'Delete' },
  Lock: { class: 'fa fa-power', tooltip: 'Lock' },
  Unlock: { class: 'unlock', tooltip: 'Unlock' },
  Pdf: { class: 'pdf', tooltip: 'Pdf' },
  Excel: { class: 'excel', tooltip: 'Excel' },
  Play: { class: 'play', tooltip: 'Play' },
  Pause: { class: 'pause', tooltip: 'Pause' },
  aprove: { class: 'aprove', tooltip: 'aprove' },
  reject: { class: 'reject', tooltip: 'reject' },
  security: { class: 'security', tooltip: 'security' },
  tranfer: { class: 'tranfer', tooltip: 'tranfer' },
  print: { class: 'fa fa-print', tooltip: 'print'},
}

const ActionButtonComponent = (props) => {
  const actionButton = actionButtons[props.type]
  const className = classnames('action')
  return (
    <a id={actionButton.tooltip} className={className} onClick={props.onClick} title={props.hint}>
      <i className={actionButton.class} />
    </a>
  )
}

ActionButtonComponent.propTypes = {
  type: PropTypes.oneOf(
    ['View', 'Edit', 'Delete', 'Lock', 'Unlock', 'Pdf', 'Excel', 'Play', 'Pause', 'aprove', 'reject', 'security', 'tranfer','print'],
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string,
  iconStyle: PropTypes.string,
  hint: PropTypes.string,
}

export default ActionButtonComponent
