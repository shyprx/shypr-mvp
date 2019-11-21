import React from 'react'
import PropTypes from 'prop-types'
import LoaderComponent from '../Loader/LoaderComponent'
import './Datatable.css'

const LoadingBar = ({ loading, colSpan }) => (loading
  ? (
    <thead>
      <tr>
        <th colSpan={colSpan} className="loadingBar">
          <LoaderComponent className="loadingBar" />
        </th>
      </tr>
    </thead>
  )
  : null)

LoadingBar.propTypes = {
  loading: PropTypes.bool.isRequired,
  colSpan: PropTypes.number.isRequired,
}

export default LoadingBar
