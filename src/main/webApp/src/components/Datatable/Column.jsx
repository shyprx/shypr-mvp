/**
 * @Author: moalsabih
 * @Date:   16-10-2017
 * @Project: GACA - PERMITS
 * @Last modified by:   moalsabih
 * @Last modified time: 25-10-2017
 */



import {Component} from 'react'
import PropTypes from 'prop-types'

/**
Helper class
*/
export default class Column extends Component {

  render() {
    return this.props.children
  }
}

Column.propTypes = {
  id: PropTypes.string,
  sortable: PropTypes.bool,
  hidden: PropTypes.bool,
  isKey: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired
}
