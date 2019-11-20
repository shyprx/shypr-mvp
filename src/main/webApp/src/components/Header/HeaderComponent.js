import React from 'react'
import PropTypes from 'prop-types'
import logoImg from '../../assets/images/shypr-logo-cut.png'
import './Header.css'
import TopbarComponent from '../Topbar/TopbarComponent'

export default class HeaderComponent extends React.Component {
  render() {
    const props = this.props
    return (
      <header className="header clearfix">
       <div className="header-block">
          <div className="container">
            <button className="con navbar-toggle " onClick={() => {document.body.classList.toggle('nav-open')}} id='headerIcon' type="button" aria-label="Toggle navigation">
            <div className="bar top"></div>
            <div className="bar middle"></div>
            <div className="bar bottom"></div>
          </button>
            <TopbarComponent locale={props.locale} onLocaleClick={props.onLocaleClick} />
            <a className="navbar-brand logo float-left" href="/home">
              <img src={logoImg} className="d-inline-block align-top" width={300} alt='true' />  
            </a>
            <div className="userProfile float-right">
              <div className="loggedDetails">
                <div className="dropdown">
                  <a className="userName dropdown-toggle" href="/home" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> محمد فهد </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item"> الملف الشخصي</a>
                    <a className="dropdown-item">  الاعدادات </a>
                    <a className="dropdown-item">  التنبيهات (5) </a>
                    <a className="dropdown-item text-primary bg-light" href="login-ar.htm">تسجيل الخروج</a>
                  </div>
                </div>
              </div>
            </div>
            
            <a href="" className="userProfile-toggle"><i className="fa fa-user" aria-hidden="true" />User</a>
          </div>
          
        </div>
     </header>
    )
  }
}

HeaderComponent.propTypes = {
  locale: PropTypes.string.isRequired,
  onLocaleClick: PropTypes.func.isRequired,
}
