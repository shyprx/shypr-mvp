import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import HeaderComponent from '../../Header/HeaderComponent'
// import NavMenuComponent from '../../NavMenu/NavMenuComponent'
import NavMenuComponent from '../../Navbar/NavbarComponent';
import FooterComponent from '../../Footer/FooterComponent'
import './Layout.css'
import '../../../assets/css/custom-ar.css'
import { ContextConsumer } from '../../../context/AppContext'
import i18n from '../../../i18n'

class LayoutComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dir: i18n.dir(),
      showNav:''
    }
  }

  componentDidMount() { i18n.on('languageChanged', this.langChange) }

  langChange = () => { this.setState({ dir: i18n.dir() }) }
  showNav = () => {
    let { showNav } = this.state
    showNav = showNav ? '' : ' nav-open'
    this.setState({ showNav })
  }
  showPage = () => this.setState({ showNav:'' })
  showNavMenu = () => {
    let { showNav } = this.state
    if(!showNav){
      this.setState({ showNav:' nav-open' })
    }
  }
  render() {
    const {
      children, history, isAuth, user,
    } = this.props    
    const { showNav } = this.state
    const isLoginPage = history && history.location && history.location.pathname.includes('login')
    const { dir } = this.state
    return (
      <div dir={dir}>
        {isLoginPage ? children : (
          <div>
            <div className={'page-wrapper'+ showNav}>
              <HeaderComponent isAuth={isAuth} user={user} showNav={this.showNav} requireRayahVerify={this.props.requireRayahVerify} />
              <section>
              {isAuth && 
              <NavMenuComponent location={history.location.pathname}  showNav={this.showNav} showPage={this.showPage} showNavMenu={this.showNavMenu} />
              }
                    
                <div className='container'>
                  <div className='row page-layout'>
                  {children}
                  </div>
                </div>
              </section>
            </div>
            <FooterComponent />
          </div>
        )}
      </div>

    )
  }
}

export default translate('translations')(
  props => (
    <ContextConsumer>
      {state => (
        <LayoutComponent
          {...props}
          location={state.location}
          isAuth={state.isAuth}
          setUser={state.setUser}
          user={state.user}
          requireRayahVerify={state.requireRayahVerify}
        />
      )}
    </ContextConsumer>
  ),
)

LayoutComponent.propTypes = {
  children: PropTypes.node,
  onNavClick: PropTypes.func,
  history: PropTypes.object,
}
