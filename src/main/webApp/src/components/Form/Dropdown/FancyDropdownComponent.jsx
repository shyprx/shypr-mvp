import React from 'react'
import PropTypes from 'prop-types'
import './fancy.css'

export default class FancyDropdownComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: props.locale,
      amIActive: false,
    }
  }

    onChange = (event) => {
      const { onChange } = this.props
      if (onChange) {
        onChange(event)
      }
    }

    render() {
      const { amIActive } = this.state
      const { list } = this.props
      return (
        <div className='container'>
          <div className={'dropdown ' + (amIActive ? 'active' : '')}>
            <span id='selLabel' className='selLabel' onClick={() => { this.setState({ amIActive: !amIActive }) }} role="presentation">
                  Select One
            </span>
            <input type='hidden' name='cd-dropdown' />
            <ul className='dropdown-list'>
              {
                list.map(item => (
                  <li
                    data-value={item.id}
                    onClick={() => {
                      document.getElementById('selLabel').innerText = document.getElementById(item.id).innerText
                      this.setState({
                        amIActive: !amIActive,
                        selected: document.getElementById(item.id).innerText,
                      })
                    }}
                    role="presentation"
                  >
                    <span id={item.id}>
                      {item.name}
                    </span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      )
    }
}

FancyDropdownComponent.propTypes = {
  locale: PropTypes.string,
  list: PropTypes.arrayOf.isRequired,
  onChange: PropTypes.func.isRequired,
}
FancyDropdownComponent.defaultProps = {
  locale: 'ar',
}
