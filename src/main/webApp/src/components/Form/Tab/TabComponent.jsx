import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Tab.css'

export default class TabComponent extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      activeTab: props.activeTab
    })
    this.onChange = this.onChange.bind(this)
  }

  onChange(tab) {
    if(this.state.activeTab !== tab) {
      this.setState({activeTab: tab})
      this.props.onChange(tab)
    }
  }

  render() {
    const { tabs } = this.props
    return (
      <ul className='nav nav-tabs'>
        {
          tabs.map(tab => {
            let linkClassName = classnames({
              'nav-item': true,
              'active': tab.id === this.state.activeTab
            })
            let linkClassName2 = classnames({
              'nav-link': true,
              'active': tab.id === this.state.activeTab
            })
            return (
              <li key={tab.id} className={linkClassName}>
                <a id={tab.id} href='javascript:void(0)' className={linkClassName2}
                  role='tab'
                  onClick={() => this.onChange(tab.id)}>
                  {tab.name}
                </a>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

TabComponent.propTypes = {
  tabs: PropTypes.array.isRequired,
  activeTab: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
