import React from 'react'
import PropTypes from 'prop-types'

const DataCell = (props) => {
  return (<td>{props.children}</td>)
}

DataCell.propTypes = {
  children: PropTypes.node
}

 export default DataCell
