import React, { Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Datatable.css'

export default class TableHeader extends Component {

  constructor(props) {
    super(props)
    this.renderColumns = this.renderColumns.bind(this)
    this.onSort = this.onSort.bind(this)
  }

  onSort(id) {
    this.props.onSort(id)
  }

  renderColumns() {
    const children = this.props.children
    const { sortColumn, sortDir } = this.props
    return React.Children.map(children, col => {
      const style = classnames({
        ['hiddenColumn']: col.props.hidden,
        ['sortable']: col.props.sortable,
        ['ascSort']: col.props.id === sortColumn && sortDir === 'asc',
        ['descSort']: col.props.id === sortColumn && sortDir === 'desc',
        ['alignRight']: col.props.headerAlign === 'right',
        ['alignLeft']: col.props.headerAlign === 'left',
        ['alignCenter']: col.props.headerAlign === 'center',
      }, 'headerCell')
      var props = {}
      if (col.props.sortable && col.props.id) {
        props.onClick = () => this.onSort(col.props.id)
      }
      props.className = style
      return React.createElement(
        'th', {
          ...props
        },
        col
      )
    })
  }

  render() {
    const { indexable } = this.props
    return (
      <thead>
        <tr>
          {indexable? <th>#</th>: null}
          { this.renderColumns() }
        </tr>
      </thead>
    )
  }
}

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
  sortColumn: PropTypes.string,
  sortDir: PropTypes.string,
  indexable: PropTypes.bool
}
