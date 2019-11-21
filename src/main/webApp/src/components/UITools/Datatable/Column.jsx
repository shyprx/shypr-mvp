import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Column extends Component {
  render() {
    const { children } = this.props
    return children
  }
}

Column.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
}
