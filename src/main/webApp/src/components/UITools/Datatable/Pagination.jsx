import React from 'react'
import PropTypes from 'prop-types'
import ReactPaginate from 'react-paginate'
import { Trans } from 'react-i18next'
import './Pagination.css'

const Pagination = (props) => {
  const { pageCount, onPageChange, forcePage } = props
  return (
    <ReactPaginate
      previousLabel={<Trans i18nKey='previous' />}
      nextLabel={<Trans i18nKey='next' />}
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
      activeClassName='activePage'
    />
  )
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  forcePage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default Pagination
