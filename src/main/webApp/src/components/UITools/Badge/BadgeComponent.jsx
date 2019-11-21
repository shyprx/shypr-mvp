import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Badge.css'
import { Trans } from 'react-i18next'

const types = {
  NEW: { class: 'badge-info' },
  USED: { class: 'badge-info' },
  ACTIVE: { class: 'badge-success' },
  INACTIVE: { class: 'badge-danger' },
  UNCONFIRMED: { class: 'badge-warning' },
  ACTIVATED: { class: 'badge-success' },
  DEACTIVATED: { class: 'badge-danger' },
  PENDING_FOR_APPROVAL: { class: 'badge-warning' },
  REJECTED: { class: 'badge-danger' },
  CANCELLED: { class: 'badge-danger' },
  CANCELLED_BY_SYSTEM: { class: 'badge-danger' },
  VALID: { class: 'badge-success' },
  INVALID: { class: 'badge-warning' },
  NEED_YAKEEN_VALIDATION: { class: 'badge-warning' },
  NEED_TO_SET_NAME: { class: 'badge-warning' },
  SUSPENDED: { class: 'badge-danger' },
  LOCKED: { class: 'badge-danger' },
  EXPIRED: { class: 'badge-danger' },
  RENEWAL: { class: 'badge-danger' },
  ISSUENESS: { class: 'badge-danger' },
  UPDATED: { class: 'badge-info' },
  UNUPDATED: { class: 'badge-warning' },
  MAIN: { class: 'badge-success' },
  BRANCH: { class: 'badge-info' },
  APPROVED: { class: 'badge-success' },
  PRIVATE: { class: 'badge-black' },
  PUBLIC: { class: 'badge-yallow' },
  PRIVATE_TRANSPORT: { class: 'badge-blue' },
  INDIVIDUAL: { class: 'badge-success' },
  COMPANY: { class: 'badge-success' },


}
const BadgeComponent = (props) => {
  const { type } = props
  const typeProp = types[type]
  const className = classnames('badge', typeProp.class)
  return (
    <Fragment>
      <span className={className}>
        <Trans i18nKey={type} />
      </span>
    </Fragment>
  )
}

BadgeComponent.propTypes = {
  type: PropTypes.oneOf(
    ['NEW', 'PENDING_FOR_APPROVAL', 'USED', 'VALID', 'INVALID', 'NEED_YAKEEN_VALIDATION', 'NEED_TO_SET_NAME',
    'APPROVED',  'ACTIVE', 'REJECTED', 'CANCELLED', 'CANCELLED_BY_SYSTEM', 'SUSPENDED', 'INACTIVE', 'LOCKED', 'UNCONFIRMED', 'ACTIVATED', 'DEACTIVATED',
      'EXPIRED', 'RENEWAL', 'ISSUENESS', 'UPDATED', 'UNUPDATED', 'MAIN', 'BRANCH', 'INDIVIDUAL', 'COMPANY', 'PUBLIC', 'PRIVATE', 'PRIVATE_TRANSPORT'],
  ).isRequired,
}

export default BadgeComponent
