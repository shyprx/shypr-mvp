/**
 * @Author: moalsabih
 * @Date:   16-10-2017
 * @Project: GACA - PERMITS
 * @Last modified by:   moalsabih
 * @Last modified time: 25-10-2017
 */



import React from 'react'
import PropTypes from 'prop-types'
import ReactPaginate from 'react-paginate'
import { FormattedMessage } from 'react-intl'
import './Pagination.css'

const Pagination = (props) => {
  const { pageCount, onPageChange, forcePage } = props
  return (
    <ReactPaginate previousLabel={<FormattedMessage id='previous'/>}
                 nextLabel={<FormattedMessage id='next'/>}
                 breakLabel={<a>...</a>}
                 breakClassName='break'
                 pageCount={pageCount}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={3}
                 onPageChange={onPageChange}
                 forcePage={forcePage}
                 containerClassName='pagination'
                 pageLinkClassName='pageLink'
                 previousClassName='previous'
                 nextClassName='next'
                 disabledClassName='disabled'
                 activeClassName='activePage' />
  )
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  forcePage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default Pagination
