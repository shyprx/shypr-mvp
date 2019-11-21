import React from 'react'
import PropTypes from 'prop-types'
import './birthDayPicker.css'

export default class DropDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: true,
    }
  }
  render() {
    const list = this.props.List
    return (
      <select
        value={this.props.value}
        disabled={this.props.disableClick}
        onChange={this.props.onclick}
        className={this.props.isYear === 'Y' ? 'selectWidthYear formControl' :
          this.props.isMonth === 'M' ? 'selectWidthMonth formControl' : this.props.isDay === 'D' ? 'selectWidthDay formControl  ' : 'formControl '}
      > >
        <option key='-1' >{this.props.defultValue}</option>
        {list.map(item => <option key={item.key}>{item.data}</option>)}
      </select>
    )
  }
}

DropDown.propTypes = {
  List: PropTypes.array.isRequired,
  onclick: PropTypes.func.isRequired,
  defultValue: PropTypes.string.isRequired,
  value: PropTypes.string,
  disableClick: PropTypes.bool,
  isMonth: PropTypes.bool,
}
