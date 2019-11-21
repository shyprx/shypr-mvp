import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Helper Component to detect mouse clicks outside the children,
 * credits: react-dates component
 */
export default class OutsideClickHandler extends Component {
  constructor(props) {
    super(props)
    this.onOutsideClick = this.onOutsideClick.bind(this)
  }

  componentDidMount() {
    if (document.addEventListener) {
      document.addEventListener('click', this.onOutsideClick, true)
    } else {
      document.attachEvent('onclick', this.onOutsideClick)
    }
  }

  componentWillUnmount() {
    if (document.removeEventListener) {
      document.removeEventListener('click', this.onOutsideClick, true)
    } else {
      document.detachEvent('onclick', this.onOutsideClick)
    }
  }

  onOutsideClick(event) {
    const { onOutsideClick } = this.props
    const isDescendantOfRoot = this.childNode.contains(event.target)
    if (!isDescendantOfRoot) {
      onOutsideClick(event)
    }
  }

  render() {
    return (
      <div ref={(ref) => { this.childNode = ref }}>
        {this.props.children}
      </div>
    )
  }
}

OutsideClickHandler.propTypes = {
  children: PropTypes.node.isRequired,
  onOutsideClick: PropTypes.func.isRequired
}
