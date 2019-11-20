import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Row from './Row'
import './Datatable.css'

export default class TableBody extends Component {

  render() {
    const { data, keyColumn, pageNumber, pageSize, indexable } = this.props
    const columns = this.props.columnMetadata
    const numberOfColumns = indexable? columns.length + 1 : columns.length
    let currentIndex = pageNumber * pageSize
    if (data && data.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={numberOfColumns} className={'noRecords'}>
              <FormattedMessage id='noDataAvailable'/>
            </td>
          </tr>
        </tbody>
      )
    }
    return (
      <tbody>
        {
          data.map(row => {
            currentIndex = currentIndex  + 1
            return <Row key={row[keyColumn]}
                        data={row}
                        index={indexable? currentIndex : null}
                        metadata={columns}
                        keyColumn={keyColumn} />
          })

        }
      </tbody>
    )
  }
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columnMetadata: PropTypes.array.isRequired,
  keyColumn: PropTypes.string.isRequired,
  pageNumber: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  indexable: PropTypes.bool
}
