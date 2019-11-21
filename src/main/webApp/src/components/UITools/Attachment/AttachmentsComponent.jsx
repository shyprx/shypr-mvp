import React from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'
import classNames from 'classnames'
import axios from 'axios'
import { AR } from '../../../constants/LocaleConstants'
import LoaderComponent from '../Loader/LoaderComponent'
import InlineMessageComponent from '../InlineMessage/InlineMessageComponent'
import ActionButtonComponent from '../../Form/ActionButton/ActionButtonComponent'
import ModalComponent from '../Modal/ModalComponent'
import './Filepicker.css'

let savedEvent
let savedTarget
let savedDataTransfer
let savedType

export default class AttachmentsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      attachments: [],
      className: '',
      requiredAttachmentError: null,
      showModal: false,
      currentRoles: this.props.currentRoles ? this.props.currentRoles : null,
      captchaResponse: null,
    }
    this.handleFileChange = this.handleFileChange.bind(this)
    this.eventonDragEnter = this.eventonDragEnter.bind(this)
    this.eventonDragLeave = this.eventonDragLeave.bind(this)
    this.eventonDragOver = this.eventonDragOver.bind(this)
    this.eventonDrop = this.eventonDrop.bind(this)
    this.deleteAttachment = this.deleteAttachment.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.handleViewImage = this.handleViewImage.bind(this)
    this.renderCaptcha = this.renderCaptcha.bind(this)
    this.handleEvent = this.handleEvent.bind(this)
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.eventonDragLeave)
    window.addEventListener('dragenter', this.eventonDragEnter)
    window.addEventListener('dragover', this.eventonDragOver)
    window.addEventListener('drop', this.eventonDrop)
  }

  componentWillReceiveProps(newProps) {
    const configId = newProps.requiredAttachmentError
    const { attachmentConfig } = this.props
    const { attachments } = this.state
    const stateObj = this.state    
    if (configId) {
      stateObj['responseError' + configId] = null
      stateObj['uploadClass' + configId] = 'failedUpload'
    } else {
      for (const configs in attachmentConfig) {
        if (attachmentConfig[configs].required) {
          for (const atts in attachments) {
            if (attachments[atts] === attachmentConfig[configs].attachmentConfigID) {
              stateObj['uploadClass' + configId] = 'successUpload'
            } else {            
              stateObj['uploadClass' + newProps.configId] = null
            }
          }
        }
      }
    }
    this.setState({ requiredAttachmentError: configId, stateObj })
    if (newProps.viewAttachments) {
      this.setState({ attachments: newProps.viewAttachments })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.eventonDragLeave)
    window.removeEventListener('dragenter', this.eventonDragEnter)
    window.addEventListener('dragover', this.eventonDragOver)
    window.removeEventListener('drop', this.eventonDrop)
  }

  handleEvent(e, type) {
    savedEvent = e
    savedTarget = e.currentTarget
    savedDataTransfer = e.dataTransfer
    savedType = type
    // const { captchaResponse } = this.state
    // if (!captchaResponse && this.props.attachmentConfigurationID === 1) {
    //   window.grecaptcha.execute()
    // } else {
      this.handleFileChange(e, type)
    // }
  }

  handleFileChange() {
    const type = parseInt(savedType, 10)
    const stateObj = {}
    const { attachmentConfig } = this.props
    let allowedMimeTypes = []
    let allowedSize = null
    stateObj['loading' + savedType] = true
    stateObj['responseError' + type] = null
    stateObj['fileName' + type] = null

    this.setState(stateObj)
    const { attachments, captchaResponse } = this.state
    savedEvent.preventDefault()
    let receivedFile = null
    if (savedTarget.files) {
      if (savedTarget.files[0]) {
        receivedFile = savedTarget.files[0]
      }
    } else if (savedDataTransfer) {
      if (savedDataTransfer.files[0]) {
        receivedFile = savedDataTransfer.files[0]
      }
    } if (receivedFile) {
      for (const atts in attachmentConfig) {
        if (attachmentConfig[atts].required && attachmentConfig[atts].attachmentConfigID === type) {
          stateObj.requiredAttachmentError = null
        } if (attachmentConfig[atts].attachmentConfigID === type) {
          allowedMimeTypes = attachmentConfig[atts].allowedExt.replace(/\s/g, '').split(',')
          allowedSize = attachmentConfig[atts].maxSize
        }
      }
      if (allowedMimeTypes.includes(receivedFile.type) && receivedFile.size <= allowedSize) {
        const data = new FormData()
        data.append('file', receivedFile)
        data.append('captchaToken', captchaResponse)
        const headers = { 'Content-Type': 'multipart/form-data' }
        axios.post(this.props.url + type + '&' + this.props.attachmentConfigurationID, data, { headers })
          .then((response) => {
            let x = {}
            x = response.data
            if (!this.props.isXlsCall) {
              if(attachments.length > 0){
              let index = attachments.map(obj =>{return obj.attachmentType}).indexOf(x.attachmentType)
                    if(index != -1){
                    attachments[index]= x;
                    }else{
                      attachments[x.attachmentType] = x
                    }
                }else{
                  attachments[x.attachmentType] = x
                }
            } else {
              this.props.handleAttachments(response.data, type)
            }
            stateObj['loading' + type] = false
            stateObj['fileName' + type] = x.attachmentUserFileName
            stateObj['uploadClass' + type] = 'successUpload'
            this.setState(stateObj)
           // window.grecaptcha.reset()
          }).catch((error) => {
            delete attachments[type]
            stateObj['responseError' + type] = error.response.data
            stateObj['loading' + type] = false
            stateObj['uploadClass' + type] = 'failedUpload'
            this.setState(stateObj)
            // window.grecaptcha.reset()
          })
      } else if (!allowedMimeTypes.includes(receivedFile.type)) {
        delete attachments[type]
        stateObj['loading' + type] = false
        stateObj['responseError' + type] = { arabicMessage: <Trans i18nKey='attachmentType' />, message: <Trans i18nKey='attachmentType' /> }
        stateObj['uploadClass' + type] = 'failedUpload'
        this.setState(stateObj)
      } else if (receivedFile.size > allowedSize) {
        delete attachments[type]
        stateObj['loading' + type] = false
        stateObj['responseError' + type] = { arabicMessage: <Trans i18nKey='attachmentSize' />, message: <Trans i18nKey='attachmentSize' /> }
        stateObj['uploadClass' + type] = 'failedUpload'
        this.setState(stateObj)
      }
    } else {
      delete attachments[type]
      stateObj['fileName' + type] = null
      stateObj['loading' + type] = false
      stateObj['uploadClass' + type] = null
      this.setState(stateObj)
    }
    this.setState(attachments)
    if (!this.props.isXlsCall) {
      this.props.handleAttachments(attachments, type)
    }
  }

  deleteAttachment(e, type) {
    const { attachments } = this.state
    const stateObj = {}
    delete attachments[type]
    stateObj['fileName' + type] = null
    stateObj['loading' + type] = false
    stateObj['uploadClass' + type] = null
    stateObj.attachments = attachments
    this.setState(stateObj)
  }

  eventonDragEnter(e) {
    this.setState({ className: 'drop-zone-show' })
    e.stopPropagation()
    e.preventDefault()
    return false
  }

  eventonDragOver=(e) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  eventonDragLeave(e) {
    this.setState({ className: '' })
    e.stopPropagation()
    e.preventDefault()
    return false
  }

  eventonDrop(e) {
    e.preventDefault()
    this.handleFileChange(e, e.path[1].id)
    this.setState({ className: '' })
    return false
  }

  hideModal() {
    this.setState({ showModal: false, url: null, text: null })
  }

  handleViewImage(url, text) {
    this.setState({ showModal: true, url, text })
  }

  renderCaptcha(response) {
    this.setState({ captchaResponse: response })
    this.handleFileChange(this.state.e, this.state.type)
  }

  render() {
    const { attachments } = this.state
    //successUpload 
    //failedUpload
    const {
      types,
      conditionOn,
      isNotAvailable,
      attachmentConfig,
      specific,
      isAuthElm,
    } = this.props
    return (
      <div>
        <InlineMessageComponent
          message={<Trans i18nKey='infoMessage0002'values={{ types, fileSize: attachmentConfig[0].maxSize / 1024 / 1024 }} />}
          type='info'
        />
        <div className='masonry'>
          {attachmentConfig.map(attachment => (isAuthElm == '2' && attachment.attachmentTypeEn == 'Ownership' ? null : (
            <div key={attachment.attachmentConfigID} className='inlineBoxes'>
              {((!specific && attachment.attachmentConfigID !== conditionOn) || (!specific && !isNotAvailable)) || attachment.attachmentConfigID === specific ? (
                <div
                  id={attachment.attachmentConfigID}
                  className={classNames('item',
                    this.state['uploadClass' + attachment.attachmentConfigID]  === 'successUpload' ? 'successUpload' :
                    attachment.required &&   this.state['uploadClass' + attachment.attachmentConfigID] !== 'successUpload' && this.state.requiredAttachmentError ?'failedUpload':   ' ', this.state.className)}
                >
                  <label className={classNames('blod', { required: attachment.required })} id='required' />
                  <label id={attachment.attachmentConfigID} htmlFor={attachment.attachmentConfigID + 'File'}>{this.props.lang === AR ? attachment.attachmentTypeAr : attachment.attachmentTypeEn}</label>
                  <br />
                  {this.state['loading' + attachment.attachmentConfigID] ? <LoaderComponent /> : null}
                  {Object.values(attachments)
                    .find(file => file.attachmentSystemFileName.includes(attachment.attachmentTypeEn)
                        && file.attachmentExt !== 'pdf')
                    ? (<a
                      onClick={this.handleViewImage.bind(this, Object.values(attachments).find(file => file.attachmentSystemFileName.includes(attachment.attachmentTypeEn)).requestID
                        ? '/api/v1/file/' + Object.values(attachments)
                          .find(file => file.attachmentSystemFileName.includes(attachment.attachmentTypeEn)).requestID
                              + '/' + attachment.attachmentConfigID
                        : '/api/v1/file/tmp/' + Object.values(attachments)
                          .find(file => file.attachmentSystemFileName.includes(attachment.attachmentTypeEn)).attachmentExt
                          + '/' + attachment.attachmentTypeEn, this.props.lang === AR
                        ? attachment.attachmentTypeAr
                        : attachment.attachmentTypeEn)}
                      href='#downloaded'
                    >
                    {/* <img
                      alt={attachment.attachmentTypeEn}
                      width='90%'
                          src={Object.values(attachments).find(file => file.attachmentSystemFileName.includes(attachment.attachmentTypeEn)).requestID ? '/api/v1/ftp/' + Object.values(attachments).find(file => file.attachmentSystemFileName.includes(attachment.attachmentTypeEn)).requestID + '/' + attachment.attachmentConfigID 
                          : '/api/v1/ftp/tmp/' 
                            + Object.values(attachments).find(file => file.attachmentSystemFileName.includes(attachment.attachmentTypeEn)).attachmentExt
                            + '/' + attachment.attachmentTypeEn}
                        /> */}
                      <img
                        alt={attachment.attachmentTypeEn}
                        width='90%'
                        src={Object.values(attachments).find(file => file.attachmentSystemFileName.includes(attachment.attachmentTypeEn)).requestID ? '/api/v1/file/' + Object.values(attachments).find(file => file.attachmentSystemFileName.includes(attachment.attachmentTypeEn)).requestID + '/' + attachment.attachmentConfigID 
                        : '/api/v1/file/tmp/'+ Object.values(attachments).find(file => file.attachmentSystemFileName.includes(attachment.attachmentTypeEn)).attachmentExt
                            + '/' + attachment.attachmentTypeEn}
                      />
                    </a>
                    ) : Object.values(attachments)
                      .find(file => file.attachmentSystemFileName.includes(attachment.attachmentTypeEn)
                        && file.attachmentExt === 'pdf')
                      ? (<a href={Object.values(attachments).find(file => file.attachmentSystemFileName.includes(attachment.attachmentTypeEn)).requestID
                        ? '/api/v1/file/' + Object.values(attachments)
                          .find(file => file.attachmentSystemFileName.includes(attachment.attachmentTypeEn)).requestID
                            + '/' + attachment.attachmentConfigID
                        : '/api/v1/file/tmp/'
                        + Object.values(attachments)
                          .find(file => file.attachmentSystemFileName.includes(attachment.attachmentTypeEn)).attachmentExt
                          + '/' + attachment.attachmentTypeEn}
                      >
                        <i className='fa fa-file-pdf attachmentIcon' aria-hidden='true' />
                      </a>
                      ) : null}
                  {!attachment.required && !this.state.requiredAttachmentError
                    ? this.state['responseError' + attachment.attachmentConfigID] ? (
                      <InlineMessageComponent
                        message={this.props.lang === AR ? this.state['responseError' + attachment.attachmentConfigID].arabicMessage : this.state['responseError' + attachment.attachmentConfigID].message}
                        type='uploadError'
                      />
                    ) : null
                    : this.state['responseError' + attachment.attachmentConfigID] ? (
                      <InlineMessageComponent
                        message={this.props.lang === AR ? this.state['responseError' + attachment.attachmentConfigID].arabicMessage : this.state['responseError' + attachment.attachmentConfigID].message}
                        type='uploadError'
                      />
                    ) : null}
                  {window.location.href.indexOf('querySubscriptionRequest') != -1 || window.location.href.indexOf('viewSubscriptionRequest') != -1 ? null : (
                    <label className='label' id={attachment.attachmentConfigID} htmlFor={attachment.attachmentConfigID + 'File'}>
                      {this.state['uploadClass' + attachment.attachmentConfigID] !== 'successUpload'
                        ? <Trans i18nKey='dragNdrop' />
                        : null}
                      <br />{this.state['fileName' + attachment.attachmentConfigID]}
                    </label>
                  )}
                  {window.location.href.indexOf('querySubscriptionRequest') != -1 || window.location.href.indexOf('viewSubscriptionRequest') != -1 ? null
                    : this.state['uploadClass' + attachment.attachmentConfigID] === 'successUpload'
                      ? <ActionButtonComponent type='Delete' hint='Delete' onClick={e => this.deleteAttachment(e, attachment.attachmentConfigID)} />
                      : null}
                  {window.location.href.indexOf('querySubscriptionRequest') != -1 || window.location.href.indexOf('viewSubscriptionRequest') != -1 ? null
                    : attachment.required &&   this.state['uploadClass' + attachment.attachmentConfigID] !== 'successUpload'
                      ? this.state.requiredAttachmentError ? (
                        <InlineMessageComponent
                          message={<Trans i18nKey='errorMessage.isRequired' values={{ name: this.props.lang === AR ? attachment.attachmentTypeAr : attachment.attachmentTypeEn }} />}
                          type='uploadError'
                        />
                      ) : null
                      : null}
                  <input type='file' id={attachment.attachmentConfigID + 'File'} className='file' onChange={e => this.handleEvent(e, attachment.attachmentConfigID)} accept='application/pdf, image/jpeg, image/png,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' />
                </div>
              ) : null}
            </div>
          )))}
        </div>
        <br />
        <ModalComponent showModal={this.state.showModal} noBorders onDestroy={() => this.setState({ showModal: false, url: null, text: null })}>
          <img src={this.state.url} alt='stuff' width='100%' />
          <span>{this.state.text}</span>
        </ModalComponent>
         {/* <RecaptchaComponent callAPI={this.renderCaptcha} locale={this.props.lang} /> */}
      </div>
    )
  }
}

AttachmentsComponent.propTypes = {
  attachmentConfig: PropTypes.array.isRequired,
  handleAttachments: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  requiredAttachmentError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  attachmentConfigurationID: PropTypes.number,
  isNotAvailable: PropTypes.bool,
  isXlsCall: PropTypes.bool,
  conditionOn: PropTypes.number,
  specific: PropTypes.number,
  url: PropTypes.string,
  types: PropTypes.string,
  viewAttachments: PropTypes.any,
}
AttachmentsComponent.defaultProps = {
  isNotAvailable: false,
  conditionOn: -1,
  url: '/api/v1/file/',
  isXlsCall: false,
  types: 'PDF, JPG, PNG',
}
