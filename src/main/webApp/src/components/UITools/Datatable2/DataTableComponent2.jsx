import React from 'react'
import PropTypes from 'prop-types'
import { Trans, translate } from 'react-i18next'
import ReactTable from 'react-table'

import 'react-table/react-table.css'
import './dataTable.css'
import { ContextConsumer } from '../../../context/AppContext'

const DEFAULTPAGESIZE = 10

class DataTable2 extends React.Component {

  constructor(props) {
    super(props) ;
    this.state = {
       sortCol :  props.sortCol ? props.sortCol : 'id' ,
       sortDir :  'ASC' ,
       page :  props.page ,
       pageSize : props.pageSize ?  props.pageSize  :  DEFAULTPAGESIZE ,
    }
  }

  componentWillMount() {
    const  {sortCol} = this.state ;
    this.fetchData( 0 , sortCol ,  'ASC' ) ;
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.page !== this.state.page) {
      this.setState({ page: nextProps.page });
    }
  }

  onSortChange(newSort, column, shiftKey) {
      console.log(JSON.stringify(newSort)) ;
      const  {page} = this.state ;
      const sortCol = newSort[0].id  ;
      const sortDir = newSort[0].desc? 'DESC' : 'ASC'  ;
      if(newSort) {
          this.setState({
            sortCol :  sortCol ,
            sortDir : sortDir ,
         }) ; 
      };
      this.fetchData( page , sortCol ,  sortDir ) ;
  }

   onPageChange = (page) => {
        const  {sortCol , sortDir }  = this.state ;
        if(page) {
          this.setState({
            page :  page ,
        }) ; 
      };
       this.props.onPageChange(page) ;
       this.fetchData( page , sortCol ,  sortDir ) ;
   }

    fetchData = (page , sortCol ,  sortDir) => {
      //const sortCol = state.sorted[0] ? state.sorted[0].id : ''
      //const sortDir = state.sorted[0] && state.sorted[0].desc ? 'DESC' : 'ASC'
      this.props.handleTableChange(page, DEFAULTPAGESIZE , sortCol, sortDir)
    }

    render() {
      const {
        data, totalElements, loading, columns, page, onPageChange, 
      } = this.props

    const {pageSize}   = this.state ;

      // privilige : 'LICENSE:VIEWALL'  , 
      const auths = this.props.auths ;   
      let privColms = columns.filter(c => !c.privilige || auths.filter(element => element.authority == c.privilige).length > 0  )  ;

      return (
        <ReactTable
          columns={privColms}
          manual
          data={data}
          page={page}
          pages={Math.ceil(totalElements / pageSize )} // Display the total number of pages
          loading={loading}
          showPageSizeOptions={false}
          resizable={false}
          defaultPageSize={pageSize}
          className="-striped -highlight"
          previousText={<Trans i18nKey='previous' />}
          nextText={<Trans i18nKey='next' />}
          loadingText={<Trans i18nKey='loadingText' />}
          noDataText={<Trans i18nKey='noDataAvailable' />}
          pageText={<Trans i18nKey='pageText' />}
          ofText={<Trans i18nKey='ofText' />}
          rowsText={<Trans i18nKey='rowsText' />}
          onPageChange={this.onPageChange.bind(this)}
          onSortedChange={this.onSortChange.bind(this)} // Order to reset sort, if dont need reset could remove this
        />

      )
    }
}

DataTable2.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    Header: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
    sortable: PropTypes.bool,
    resizable: PropTypes.bool,
    show: PropTypes.bool,
    minWidth: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object,
    accessor: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]).isRequired,
  })).isRequired,
  data: PropTypes.any,
  loading: PropTypes.bool,
  page: PropTypes.number,
  totalElements: PropTypes.number,
  handleTableChange: PropTypes.func,
  onPageChange: PropTypes.func,
}

export default translate('translations')( props => <ContextConsumer>{state => <DataTable2 {...props} auths={state.user.authorities} />}</ContextConsumer> )
