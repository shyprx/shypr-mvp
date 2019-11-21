import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pagination from './Pagination'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import LoadingBar from './LoadingBar'
import './Datatable.css'

/*
  TODO
  test pagesize since its stored in state, try to change it dynamicly
  test onPageChange
*/
export default class DatatableComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentPage: 0,
      pageSize: 10, // default
    }
    this.initTable = this.initTable.bind(this)
    this.initColumnMetadata = this.initColumnMetadata.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.getCurrentPageData = this.getCurrentPageData.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.toggleSortDir = this.toggleSortDir.bind(this)
    this.GetSortOrderAsc = this.GetSortOrderAsc.bind(this)
    this.GetSortOrderDesc = this.GetSortOrderDesc.bind(this)
  }

  componentWillMount() {
    this.initTable()
  }

  componentWillReceiveProps(nextProps) {
    const {
      remote,
      total,
      currentSortDir,
      currentSortCol,
    } = nextProps

    if (remote) {
      this.setState({
        total,
        sortCol: currentSortCol,
        sortDir: currentSortDir
      })
    }
  }

  initTable() {
    const {
      pageSize,
      remote,
      data,
      total,
      currentSortDir,
      currentSortCol 
    } = this.props

    const sortCol = currentSortCol? currentSortCol : null
    const sortDir = currentSortDir? currentSortDir : 'asc'
    if (!pageSize) {
      throw new Error('Page Size is required.')
    }
    if (remote && typeof total === undefined) {
      throw new Error('Total is required when remote is enabled.')
    } else if (!remote && !data) {
      throw new Error('Data is required when remote is disabled.')
    }
    let totalRecords = remote? total : data.length
    const columns = this.initColumnMetadata()
    this.setState({
      total: totalRecords,
      columns: columns,
      sortCol: sortCol,
      sortDir: sortDir
    })
  }

  onPageChange(data) {
    const selectedPage = data.selected
    const { pageSize, remote, onChange } = this.props
    const { sortCol, sortDir } = this.state
    this.setState({ currentPage: selectedPage }, () => {
      if (remote) {
        onChange(selectedPage, pageSize, sortCol, sortDir)
      }
    })
  }

  renderPagination() {
    const { pageSize, currentPage } = this.props
    const { total } = this.state
    const pageCount = Math.ceil(total / pageSize)
    const page = currentPage !== 'undefined' ? currentPage : this.state.currentPage
    return (
      <Pagination
        pageCount={pageCount}
        onPageChange={this.onPageChange}
        forcePage={page}
      />
    )
  }

  initColumnMetadata() {
    const { children } = this.props
    let keyCell = null
    const columns = React.Children.map(children, (column) => {
      if (!keyCell && column.props.isKey) {
        keyCell = column.props.id
      } else if (keyCell && column.props.isKey) {
        throw Error('Only ony key is required')
      }
      return {
        id: column.props.id,
        isKey: column.props.isKey,
        sortable: column.props.sortable,
        hidden: column.props.hidden,
        headerAlign: column.props.headerAlign,
        dataAlign: column.props.dataAlign,
        onCellRender: column.props.onCellRender,
      }
    })
    if (!keyCell) {
      throw Error('The table should have one column as key')
    }
    this.setState({ key: keyCell })
    return columns
  }

  toggleSortDir() {
    if (this.state.sortDir === 'asc') {
      return 'desc'
    }
    return 'asc'
  }

  handleSort(col) {
    if (!this.props.loading) {
      var dir = 'asc'
      if (this.state.sortCol === col) {
        dir = this.toggleSortDir()
      }
      this.setState({
        currentPage: 0, sortCol: col, sortDir: dir,
      }, () => {
        const pageSize = this.state.pageSize
        if (this.props.remote) {
          this.props.onChange(0, pageSize, col, dir)
        } else if (dir === 'asc') {
          this.props.data.sort(this.GetSortOrderAsc(col))
        }else {
          this.props.data.sort(this.GetSortOrderDesc(col))
        }
      })
    }
  }

  getCurrentPageData() {
    // TODO add caching for pages
    const { pageSize, data, remote } = this.props
    const { currentPage } = this.state
    if (remote) {
      // TODO tricky
      return data
    }
    return data.slice(currentPage * pageSize, currentPage * pageSize + pageSize)
  }

  // Comparer Function
  GetSortOrderAsc(prop) {
    return (a, b) => {
      if (a[prop] < b[prop]) {  // sort string ascending
        return 1
      } else if (a[prop] > b[prop]) {
        return -1
      }
      return 0
    }
  }

  GetSortOrderDesc(prop) {
    return (a, b) => {
      if (a[prop] > b[prop]) {  // sort string descending
        return 1
      } else if (a[prop] < b[prop]) {
        return -1
      }
      return 0
    }
  }

  render() {
    const data = this.getCurrentPageData()
    const { pageSize, loading, indexable, children } = this.props
    const {
      key, currentPage, sortCol, sortDir, total 
    } = this.state
    const metadata = this.state.columns
    const numberOfColumns = indexable? metadata.length + 1 : metadata.length
    const pageNumber = this.props.currentPage !== undefined? this.props.currentPage : currentPage
    let isPaginated = total > pageSize

    return (
      <div className='table-responsive'>
        <table id="grid" className='table table-striped'>
          <TableHeader
            onSort={this.handleSort}
            sortColumn={sortCol}
            sortDir={sortDir}
            indexable={indexable}
          >
            {children}
          </TableHeader>
          <LoadingBar loading={loading} colSpan={numberOfColumns} />
          <TableBody
            data={data}
            columnMetadata={metadata}
            keyColumn={key}
            pageNumber={pageNumber}
            pageSize={pageSize}
            indexable={indexable}
          />
        </table>
        {isPaginated ? this.renderPagination() : null}
      </div>
    )
  }
}

DatatableComponent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.array,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  total: PropTypes.number,
  remote: PropTypes.bool,
  loading: PropTypes.bool,
  indexable: PropTypes.bool,
  onChange: PropTypes.func,
  currentSortCol: PropTypes.string,
  currentSortDir: PropTypes.string
}
