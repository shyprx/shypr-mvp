import React from 'react'
import PageContentComponent from '../PageContent/PageContentComponent'
import StaticAttchmentComponent from '../Form/StaticAttachmentComponent'
import StaticDataGroupComponent from '../Form/StaticDataGroupComponent';
import FormGroupComponent from '../Form/FromGroupComponent';
import FormControlComponent from '../Form/FormControlComponent';
import StaticDataComponent from '../Form/StaticDataComponent';
import { FormattedMessage } from 'react-intl';
// import LocationContainer from '../../containers/LocationContainer'
import InlineMessageComponent from '../InlineMessage/InlineMessageComponent'
import ModalComponent from '../Modal/ModalComponent'
import ModalFooterComponent from '../Modal/ModalFooterComponent'
// import '../Form/Button.css'
import './SelfRegistration.css'
import { Link } from 'react-router-dom'

export default class ViewRegistrationComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      registration: this.props.location.state.registration,
      submited: false,
      submitedAccept: true,
      isModalVisible: false,
    } 
    this.submitRequest = this.submitRequest.bind(this)
    this.showSuccessMsg = this.showSuccessMsg.bind(this)
    this.backHome = this.backHome.bind(this)
    this.submitFailRequest = this.submitFailRequest.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.renderConfirmationModal = this.renderConfirmationModal.bind(this)
  }

  showModal(){
    this.setState({...this.state,isModalVisible:true})
  }
  hideModal(){
    this.setState({...this.state, isModalVisible: false,})
  }

  renderConfirmationModal() {
    return (
      <ModalComponent
        showModal={this.state.isModalVisible}
        title="تأكيد الرفض"
        onDestroy={this.hideModal}
      >
        <br />
        هل تريد تأكيد رفض الطلب
        <ModalFooterComponent>
          <button
            className='btn dangerousButton'
            onClick={this.submitFailRequest}
          >
            نعم
          </button>
          {' '}
          <button className='btn defaultButton' onClick={this.hideModal}>
            لا
          </button>
        </ModalFooterComponent>
      </ModalComponent>
    )
  }

  renderData() {
    const { registration } = this.state
    return (
      <div>
        {this.renderConfirmationModal()}
  <StaticDataGroupComponent>
          <StaticDataComponent label={<FormattedMessage id='organizationType'/>} value={registration.organizationType}  colSize={[2, 4]} />
          <StaticDataComponent label={<FormattedMessage id='organizationId'/>} value={registration.organizationId}  colSize={[2, 4]} />
        </StaticDataGroupComponent>
        <StaticDataGroupComponent>
          <StaticDataComponent label={<FormattedMessage id='residentsId'/>} value={registration.residentsId}  colSize={[2, 4]} />
          <StaticDataComponent label={<FormattedMessage id='sponsoredNumber'/>} value={registration.sponsoredNumber}  colSize={[2, 4]} />
        </StaticDataGroupComponent>
        <StaticDataGroupComponent>
          <StaticDataComponent label={<FormattedMessage id='idNumber'/>} value={registration.idNumber}  colSize={[2, 4]} />
          <StaticDataComponent label={<FormattedMessage id='birthDate'/>} value={registration.birthDate}  colSize={[2, 4]} />
        </StaticDataGroupComponent>
        <StaticDataGroupComponent>
          <StaticDataComponent label={<FormattedMessage id='email'/>} value={registration.email}  colSize={[2, 4]} />
          <StaticDataComponent label={<FormattedMessage id='mobileNumber'/>} value={registration.mobileNumber}  colSize={[2, 4]} />
        </StaticDataGroupComponent>
        <StaticDataGroupComponent>
          <StaticDataComponent label={<FormattedMessage id='phoneNumber'/>} value={registration.phoneNumber}  colSize={[2, 4]} />
          <StaticDataComponent label={<FormattedMessage id='postalCode'/>} value={registration.postalCode}  colSize={[2, 4]} />
        </StaticDataGroupComponent>
        <StaticDataGroupComponent>
          <StaticDataComponent label={<FormattedMessage id='cr'/>} value={
        <StaticAttchmentComponent
          id="atch1"
          colSize={[1, 10]}
          hasLink="#c"
        />
        }  colSize={[2, 4]} />
          <StaticDataComponent label={<FormattedMessage id='agreementForm'/>} value={
        <StaticAttchmentComponent
          id="atch2"
          colSize={[1,10]}
          hasLink="#c"
        />
        }  colSize={[2,4]} />
        </StaticDataGroupComponent>
        <StaticDataGroupComponent>
          {registration.lat !== null && registration.long !== null ? null
            // <LocationContainer isEditable={false} lat={registration.lat} lng={registration.long}/>
          : <InlineMessageComponent message={<FormattedMessage id='waiting' />}
            type='info'/>}
        </StaticDataGroupComponent>
        <div className="pageActions">
        <button className='btn btn-secondary' type='button' onClick={this.submitRequest}>
        قبول الطلب
              </button>
              <button className='btn btn-secondary' type='button' onClick={this.showModal}>
              رفض الطلب
              </button>
        <Link to={'registration-list'}>
              <button className='btn btn-secondary' type='button'>
                <FormattedMessage id='back' />
              </button>
            </Link>
                                </div>
                                </div>
        )}

        backHome(){
          this.setState({ ...this.state, submited: false, submitedAccept: true })
          this.props.history.push('/registration-list')
      }
        showSuccessMsg() {
          const { submitedAccept } = this.state
          return (
  
                  <section>
                    {submitedAccept?
                  <div className="Big-message my-5 text-center">
                      <i className="fa fa-check text-success" aria-hidden="true"></i>
                      <h3 className="text-success"> تم قبول الطلب بنجاح </h3>
                      <p> العودة لصفحة   <a href="javascript:;" onClick={this.backHome} className="font-color">  طلبات التسجيل </a></p>
                      </div>
                      :
                      <div className="Big-message my-5 text-center">
                      <i className="fa fa-times text-danger" aria-hidden="true"></i>
                      <h3 className="text-danger"> تم رفض الطلب </h3>
                      <p> العودة لصفحة   <a href="javascript:;" onClick={this.backHome} className="font-color">  طلبات التسجيل </a></p>
                      </div>}
                  </section>       
          )
      }

      submitRequest() {
        this.setState({ ...this.state, submited: true, submitedAccept: true })

    }

    submitFailRequest() {
      this.setState({ ...this.state, submited: true, submitedAccept: false })

  }
  render() {
    const { submited } = this.state  
    return (
      <PageContentComponent title={<FormattedMessage id='registrationInfo'/>}>
      {!submited? this.renderData():this.showSuccessMsg()}
      </PageContentComponent>
    )
  }
}
