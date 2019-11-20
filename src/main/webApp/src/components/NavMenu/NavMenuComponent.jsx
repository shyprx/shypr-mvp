import React from 'react'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import Section from './Accordion'
import './NavMenu.css'
// import '../../assets/css/bootstrap-ar.min.css'

const navbarItems = [
  {
    path: '/',
    allowedRoles: ['admin', 'normal'],
    icon: <i className="fa fa-home" />,
    name: <FormattedMessage id='home' />,
    chiledrens: [],
  },
  // {
  //   path: '/self-Registration',
  //   icon: <i className="fa fa-sticky-note" />,
  //   allowedRoles: ['admin', 'normal'],
  //   name: <FormattedMessage id='selfRegistraion' />,
  //   chiledrens: [],
  // },
  {
    path: '/registration-list',
    icon: <i className="fa fa-list" />,
    allowedRoles: ['admin', 'normal'],
    name: <FormattedMessage id='registrationList' />,
    chiledrens: [],
  },
  {
    path: '/shipment-details',
    icon: <i className="fa fa-file-alt" />,
    allowedRoles: ['admin', 'normal'],
    name: <FormattedMessage id='requestNewShipment' />,
    chiledrens: [],
  },
  {
    path: '/shipment-rates',
    icon: <i className="fa fa-list" />,
    allowedRoles: ['admin', 'normal'],
    name: <FormattedMessage id='shipmentList' />,
    chiledrens: [],
  },
  // {
  //   path: '/operation-cards',
  //   // main: () => <OperationCardsComponent />,
  //   allowedRoles: ['normal'],
  //   name: 'OperationCardsComponent',
  //   chiledrens: [
  //     {
  //       path: '/drivers',
  //       // main: () => <DriversComponent />,
  //       allowedRoles: ['admin', 'normal'],
  //       name: 'DriversComponent',
  //     },
  //     {
  //       path: '/vehicles',
  //       // main: () => <VehiclesComponent />,
  //       allowedRoles: ['admin'],
  //       name: 'VehiclesComponent',
  //     },
  //   ],
  // },
]

export default class NavMenuComponent extends React.Component {
  renderLink = link => (
    <NavLink exact={link.name === 'home'} to={link.path}>
      {link.icon}
      {link.name}
    </NavLink>
  )

  render() {
    const { location } = this.props
    return (
      <div className=' col-12 col-lg-3 sidebar' id='sidebar'>
        <ul className='list-group'>
          {
            navbarItems.map(item => (item.chiledrens.length === 0 ? (
              <li onClick={() => { document.body.classList.remove('nav-open') }} className={location === item.path? 'list-group-item active': 'list-group-item'}>
                {this.renderLink(item)}
              </li>
            ) : (
              <li onClick={() => { document.body.classList.remove('nav-open') }} className={location === item.path? 'list-group-item active': 'list-group-item'}>
                <Section name={item.name} children={item.chiledrens}>
                  {item.chiledrens.map(subItem => (
                    <NavLink to={subItem.path}>
                      <div className='chiled'>
                        {subItem.name}
                      </div>
                    </NavLink>
                  ))}
                </Section>
              </li>
            )))
          }
        </ul>
      </div>)
  }
}

NavMenuComponent.propTypes = {
  locale: PropTypes.string.isRequired,
  onLocaleClick: PropTypes.func.isRequired,

}

