import React from 'react'
import { Link } from "react-router-dom";

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { form: 1 }

    this.showForm = this.showForm.bind(this)
  }

  showForm= (formNumber) => {
    const { form } = this.state;
    this.setState({form: formNumber})
  }

  render() {
    return (
      <div id='loginn' className="content fadeInRightLight animate delay3 ">
        <div className="container">
          <div className="side-form">



            { this.state.form==1 && this.LoginForm() }
            { this.state.form==2 && this.ForgetPassword() }
            { this.state.form==3 && this.ForgetUserName() }

            {/* <div className="organization-signup" style={{display: 'none'}} >
							<h3 className="form-title text-center mb-5"> تسجيل المنشآت </h3>
							<div className="form-group pt-5">
								<a href="organization-subscription_ar.htm" className="btn log-btn">
									<span data-hover="تسجيل جديد">تسجيل جديد</span>
								</a>
							</div>
							<img className="mt-2 mb-4" src="ui/images/seperator-or.svg" alt="OR"/>
							<div className="form-group">
								<a href="" className="btn log-btn tamm-btn" data-toggle="modal" data-target="#OrganizationLogin">
									<span data-hover="تسجيل جديد">التسجيل بحساب تم
										<img src="ui/images/Tamm-logo-white.svg" alt="Tamm"/>
									</span>
								</a>
							</div>
						</div>
						<div className="clearfix"></div>
						</div> */}
            <div className="clearfix"></div>
          </div>

        </div>
      </div>
    )
  }



  LoginForm =() => (
    <form className="login-form mb-5" style={{display: this.form==1}}>
      <h3 className="form-title text-center "> الدخــــــول </h3>
      <div className="alert alert-danger" style={{display: 'none'}}>
        <span> كلمة المرور او اسم المستخدم غير صحيح </span>
      </div>
      <div className="form-group">
        <label className="control-label visible-ie8 visible-ie9"> اسم المستخدم </label>
        <input className="form-control" type="text" autocomplete="off" placeholder="اسم المستخدم " name="username"/>
        <span className="error-block" style={{display: 'none'}}> حقل مطلوب </span>
      </div>
      <div className="form-group">
        <label className="control-label visible-ie8 visible-ie9"> كلمة المرور</label>
        <input className="form-control" type="password" autocomplete="off" placeholder="كلمة المرور  " name="password"/>
        <span className="error-block" style={{display: 'none'}}> حقل مطلوب </span>
      </div>
      <div className="form-group google-captcha d-none">
        <img className="capatcha" src="ui/images/captcha.jpg" alt="google captcha" width="100%"/>
      </div>
      <div className="form-group">
        <button onClick={() => {this.props.login()}} type="submit" className="btn log-btn">
          <span data-hover="تـسجيل الدخول">تـسجيل الدخول</span>
        </button>
      </div>
      <div className="reg-options">
        <a className="forget-username-trigger " onClick={() => {this.showForm(3)}}> نسيت إسم المستخدم </a>
        <a className="forget-password-trigger " onClick={() => {this.showForm(2)}}> نسيت كلمة السر </a>
      </div>
      <div className=" login-links">
        <div className="form-group mt-5">
          <Link to='/self-Registration' style={{ margin: '0 auto' }}>
            <button className="btn btn-secondary" type='submit' onClick={() => { this.props.toSelfRegistration() }}>تسجيل جديد</button>
          </Link>

        </div>
      </div>
    </form>

  )

  ForgetPassword = () => (
    <form className="forget-password-form" style={{display: this.form==2}} >
      <h3 className="form-title text-center"> استرجاع كلمة السر </h3>
      <div className="form-group">
        <label className="control-label visible-ie8 visible-ie9 "> رقم الهوية </label>
        <input className="form-control" type="text" autocomplete="off" placeholder="رقم الهوية" name="username"/>
      </div>
      <div className="form-group">
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked=""/>
          <label className="form-check-label" for="gridRadios1"> البريد الاليكتروني </label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
          <label className="form-check-label" for="gridRadios2"> الهاتف </label>
        </div>
      </div>
      <div className="form-group">
        <label className="control-label visible-ie8 visible-ie9 "> البريد الاليكتروني </label>
        <input className="form-control" type="text" autocomplete="off" placeholder="البريد الاليكتروني" name="username"/>
      </div>
      <div className="form-group">
        <a href="../email_template/template.html" target="_blank" className="btn log-btn">
          <span data-hover="استرجع كلمة السر">استرجع كلمة السر</span>
        </a>
      </div>
      <div className="form-group">
        <a href="javascript:;" className="border-0 btn btn-block btn-link btn-sm forget-password-trigger text-center" onClick={() => {this.showForm(1)}}> العودة لتسجيل الدخول </a>
      </div>
    </form>

  )

ForgetUserName = () => (
  <form className="forget-username-form " style={{display: this.form==3}} >
    <h3 className="form-title text-center"> استرجاع اسم المستخدم </h3>
    <div className="form-group">
      <label className="control-label visible-ie8 visible-ie9 "> رقم الهوية </label>
      <input className="form-control" type="text" autocomplete="off" placeholder="رقم الهوية" name="username"/>
    </div>
    <div className="form-group">
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked=""/>
        <label className="form-check-label" for="gridRadios1"> البريد الإلكتروني </label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
        <label className="form-check-label" for="gridRadios2"> الهاتف </label>
      </div>
    </div>
    <div className="form-group">
      <label className="control-label visible-ie8 visible-ie9 "> البريد الإلكتروني </label>
      <input className="form-control" type="text" autocomplete="off" placeholder="البريد الاليكتروني" name="username"/>
    </div>
    <div className="form-group">
      <a href="../email_template/template.html" target="_blank" className="btn log-btn">
        <span data-hover="استرجع كلمة السر">استرجع إسم المستخدم</span>
      </a>
    </div>
    <div className="form-group">
      <a href="javascript:;" className="border-0 btn btn-block btn-link btn-sm forget-username-trigger text-center" onClick={() => {this.showForm(1)}}> العودة لتسجيل الدخول </a>
    </div>
  </form>

)
}

