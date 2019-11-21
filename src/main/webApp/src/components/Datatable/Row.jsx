import React from 'react'
import PropTypes from 'prop-types'
import DataCell from './DataCell'

const Row = (props) => {
  const { data, metadata, index } = props
  return (
    <tr>
      {
        index === 0 || index? <DataCell>{index}</DataCell> : null
      }
      {
        metadata.map((col, i) => {
          let value = null
          if(col.onCellRender) {
            value = col.onCellRender(data)
          } else if(col.id) {
            value = data[col.id]
          }
          return <DataCell key={i}>{value}</DataCell>
        })
      }
    </tr>
  )
}

Row.propTypes = {
  data: PropTypes.object.isRequired,
  metadata: PropTypes.array.isRequired,
  index: PropTypes.number
}

export default Row
