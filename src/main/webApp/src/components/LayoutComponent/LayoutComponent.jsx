import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';
import { AR } from '../../constants/LocaleConstants'
import NavMenuComponent from '../NavMenu/NavMenuComponent'
import FooterComponent from '../Footer/FooterComponent'
import './Layout.css'
import '../../assets/css/custom-ar.css'
import LoginComponent from '../Login/LoginComponent'
import logoImg from '../../assets/images/shypr-logo-cut.png'
import marker from '../../assets/images/header-bg-old.png'
import HeaderComponent from '../Header/HeaderComponent';

export default class LayoutComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: props.locale,
      isLoggedIn: false,
      selfRegiration: false,
    }
  }

  handleLoginSuccess = (isLoggedIn) => { this.setState({ isLoggedIn }) }

  toSelfRegistration = () => { this.setState({ selfRegiration: true }) }

  render() {
    const { locale, children, history } = this.props
    const { isLoggedIn, selfRegiration } = this.state
    // const dir = AR === locale ? 'rtl' : 'ltr'
    const dir = 'rtl'

    return (
      <div dir={dir} className={!isLoggedIn || !selfRegiration ? '' : 'page-wrapper '}>
        {(!isLoggedIn && selfRegiration) || !isLoggedIn ? null : <HeaderComponent />}
        <section>
          <div className={isLoggedIn || selfRegiration ? 'container' : 'login'}>
            <div className={isLoggedIn || selfRegiration ? 'row page-layout' : 'login-container'}>
              {isLoggedIn ? <NavMenuComponent location='/home' />
                : selfRegiration
                  ? (
                    <div className="logo">
                      <img src={logoImg} alt="Shypr" width="500" />
                    </div>
                  )
                  : (
                    <Fragment>
                      <div className="logo">
                        <img src={logoImg} alt="Shypr" width="500" />
                      </div>

                      <LoginComponent
                        onLoginSuccess={this.handleLoginSuccess}
                        toSelfRegistration={this.toSelfRegistration}
                      />
                    </Fragment>
                  )}
              {/* <div className={isLoggedIn   ?  'welcome' : 'hide'} id='landingPageWelcome'>
              <img className='headerMarker' alt='headermarker' src={marker} />
              <h1 className='welcomeLarg'><FormattedMessage id='welcome' /></h1>
              <h1 className='welcomeSmall'><FormattedMessage id='welcomeSmall' /></h1>
              <p>
                <FormattedMessage id='purpose' />
              </p>
            </div> */}
              {children}
            </div>
          </div>
        </section>
        <FooterComponent />
      </div>
    )
  }
}

LayoutComponent.propTypes = {
  locale: PropTypes.string.isRequired,
  children: PropTypes.node,
  routes: PropTypes.array,
  onNavClick: PropTypes.func,
  location: PropTypes.string,
}
