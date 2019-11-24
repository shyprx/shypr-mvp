import React, { useState, useContext } from 'react'
import classnames from 'classnames'
import axios from 'axios';
import AuthenticationService from '../authentication/AuthenticationService';
import { publishAuthenticated } from '../authentication/AuthenticatedSubject';
import { FormattedMessage } from 'react-intl';
import UserContext from '../../common/context/UserContext';
import { Link } from "react-router-dom";

const LoginComponent = (props) => {

  const userContext = useContext(UserContext)
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const [formErrors, setFormErrors] = useState(
    {
      username: '',
      password: ''
    }
  )

  const [loginError, setloginError] = useState(false)
  const [activeForm, setActiveForm] = useState(1)

  const handleCredentialsChange = (event) => {
    setCredentials({ ...credentials, [event.target.id]: event.target.value })
  }

  const attemptLogin = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return
    }

    axios({
      method: 'get',
      url: '/api/authenticate',
      auth: credentials
    })
      .then(response => {
        setloginError(false)
        AuthenticationService.registerSuccessfulLogin(credentials.username)
        publishAuthenticated(response.data)
        userContext.setUser(response.data)
        props.onLoginSuccess(true)
        //props.history.push('/home')
      })
      .catch(error => {
        setloginError(true)
      })
  }

  const validateForm = () => {
    let formErrors = {}
    formErrors.username = credentials.username === '' ? 'username is required' : null
    formErrors.password = credentials.password === '' ? 'password is required' : null
    setFormErrors(formErrors)

    if (Object.values(formErrors).every(x => (x === null || x === ''))) {
      return true
    }

    return false
  }

  const showForm = (formNumber) => {
    setActiveForm(formNumber)
  }

  const loginForm = () => (
    <form className="login-form mb-5" style={{ display: activeForm == 1 }}>
      <h3 className="form-title text-center "> الدخــــــول </h3>
      {loginError && <div className="alert alert-danger">
        <span> كلمة المرور او اسم المستخدم غير صحيح </span>
      </div>
      }
      <div className="form-group">
        <label className="control-label visible-ie8 visible-ie9"> اسم المستخدم </label>
        <input className="form-control" type="text" autocomplete="off" placeholder="اسم المستخدم " id="username"
          onChange={handleCredentialsChange} value={credentials.username} />
        <span className="error-block" style={{ display: 'none' }}> حقل مطلوب </span>
      </div>
      <div className="form-group">
        <label className="control-label visible-ie8 visible-ie9"> كلمة المرور</label>
        <input className="form-control" type="password" autocomplete="off" placeholder="كلمة المرور  " id="password"
          onChange={handleCredentialsChange} value={credentials.password} />
        <span className="error-block" style={{ display: 'none' }}> حقل مطلوب </span>
      </div>
      <div className="form-group google-captcha d-none">
        <img className="capatcha" src="ui/images/captcha.jpg" alt="google captcha" width="100%" />
      </div>
      <div className="form-group">
        <button onClick={attemptLogin} className="btn log-btn">
          <span data-hover="تـسجيل الدخول">تـسجيل الدخول</span>
        </button>
      </div>
      <div className="reg-options">
        <a className="forget-username-trigger " onClick={() => { showForm(3) }}> نسيت إسم المستخدم </a>
        <a className="forget-password-trigger " onClick={() => { showForm(2) }}> نسيت كلمة السر </a>
      </div>
      <div className=" login-links">
        <div className="form-group mt-5">
          <Link to='/self-Registration' style={{ margin: '0 auto' }}>
            <button className="btn btn-secondary" onClick={() => { props.toSelfRegistration() }}>تسجيل جديد</button>
          </Link>

        </div>
      </div>
    </form >

  )

  const forgetPassword = () => (
    <form className="forget-password-form" style={{ display: activeForm == 2 }} >
      <h3 className="form-title text-center"> استرجاع كلمة السر </h3>
      <div className="form-group">
        <label className="control-label visible-ie8 visible-ie9 "> رقم الهوية </label>
        <input className="form-control" type="text" autocomplete="off" placeholder="رقم الهوية" name="username" />
      </div>
      <div className="form-group">
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked="" />
          <label className="form-check-label" for="gridRadios1"> البريد الاليكتروني </label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
          <label className="form-check-label" for="gridRadios2"> الهاتف </label>
        </div>
      </div>
      <div className="form-group">
        <label className="control-label visible-ie8 visible-ie9 "> البريد الاليكتروني </label>
        <input className="form-control" type="text" autocomplete="off" placeholder="البريد الاليكتروني" name="username" />
      </div>
      <div className="form-group">
        <a href="../email_template/template.html" target="_blank" className="btn log-btn">
          <span data-hover="استرجع كلمة السر">استرجع كلمة السر</span>
        </a>
      </div>
      <div className="form-group">
        <a href="javascript:;" className="border-0 btn btn-block btn-link btn-sm forget-password-trigger text-center" onClick={() => { showForm(1) }}> العودة لتسجيل الدخول </a>
      </div>
    </form>

  )

  const forgetUserName = () => (
    <form className="forget-username-form " style={{ display: activeForm == 3 }} >
      <h3 className="form-title text-center"> استرجاع اسم المستخدم </h3>
      <div className="form-group">
        <label className="control-label visible-ie8 visible-ie9 "> رقم الهوية </label>
        <input className="form-control" type="text" autocomplete="off" placeholder="رقم الهوية" name="username" />
      </div>
      <div className="form-group">
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked="" />
          <label className="form-check-label" for="gridRadios1"> البريد الإلكتروني </label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
          <label className="form-check-label" for="gridRadios2"> الهاتف </label>
        </div>
      </div>
      <div className="form-group">
        <label className="control-label visible-ie8 visible-ie9 "> البريد الإلكتروني </label>
        <input className="form-control" type="text" autocomplete="off" placeholder="البريد الاليكتروني" name="username" />
      </div>
      <div className="form-group">
        <a href="../email_template/template.html" target="_blank" className="btn log-btn">
          <span data-hover="استرجع كلمة السر">استرجع إسم المستخدم</span>
        </a>
      </div>
      <div className="form-group">
        <a href="javascript:;" className="border-0 btn btn-block btn-link btn-sm forget-username-trigger text-center" onClick={() => { showForm(1) }}> العودة لتسجيل الدخول </a>
      </div>
    </form>
  )

  return (
    <div id='loginn' className="content fadeInRightLight animate delay3 ">
      <div className="container">
        <div className="side-form">
          {activeForm == 1 && loginForm()}
          {activeForm == 2 && forgetPassword()}
          {activeForm == 3 && forgetUserName()}
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent

