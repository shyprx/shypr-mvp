import React from 'react'
import { FormattedMessage } from 'react-intl'
import CheckboxButtonGroupComponent from '../Form/CheckboxButton/CheckboxButtonGroupComponent'
import { Link } from 'react-router-dom'
import RadioButtonGroupComponent from "../Form/RadioButton/RadioButtonGroupComponent"
import FormGroupComponent from '../Form/FromGroupComponent';
import FormControlComponent from '../Form/FormControlComponent';
import StaticDataGroupComponent from '../Form/StaticDataGroupComponent';
import StaticDataComponent from '../Form/StaticDataComponent';
import PageContentComponent from '../PageContent/PageContentComponent'
import SubtitleComponent from '../Subtitle/SubtitleComponent'
// import LocationContainer from '../../containers/LocationContainer'
import ModalComponent from '../Modal/ModalComponent'
import ModalFooterComponent from '../Modal/ModalFooterComponent'
import  './SelfRegistration.css'
import PropTypes from 'prop-types'
import { axios } from "axios"

export default class SelfRegistrationComponent extends React.Component{
    constructor(props){
        super(props)
        this.submitRequest = this.submitRequest.bind(this)
        this.onTermsSelect = this.onTermsSelect.bind(this)
        this.backHome = this.backHome.bind(this)
        this.handleOrganizationTypeChange = this.handleOrganizationTypeChange.bind(this)
        this.handleRegisterByTypeChange = this.handleRegisterByTypeChange.bind(this)
        this.handleUserTypeChange = this.handleUserTypeChange.bind(this)
    }
    // getError(fieldId) {
    //     const errors = this.props.valiadationErrors
    //     if (errors[fieldId]) {
    //         return <FormattedMessage id={errors[fieldId]} values={{ fieldName: <FormattedMessage id={fieldId} /> }} />
    //     }
    //     return null
    // }

    handleOrganizationTypeChange = (event) => {
        this.props.handleFieldUpdate('organizationType', event.target.id)
    }
    handleRegisterByTypeChange = (event) => {
        this.props.handleFieldUpdate('registerByTypes', event.target.id)
    }
    handleUserTypeChange = (event) => {
        this.props.handleFieldUpdate('userType', event.target.id)
    }

    
    renderCorpprateInfo(){
        let { handleFieldUpdate, fields,locale, crNumber } = this.props
   
        return(
            <div>
                <SubtitleComponent title={<FormattedMessage id='orgInfo' />} isFirst={true} />
                {/* <RadioButtonGroupComponent groupName={locale =='en'?'organizationType':'نوع المنشأة'} 
                    onChange={this.handleOrganizationTypeChange}
                /> */}
                <FormGroupComponent>
                </FormGroupComponent>
                        <FormGroupComponent>
                        <FormControlComponent
                            label={<FormattedMessage id='crNumber' />}
                            fieldId='crNumber'
                            // // value={crNumber}
                            required
                            colSize={[2, 4]}
                            onChange={handleFieldUpdate}
                            // errorMessage={this.getError('crNumber')}
                        >
                            <input type='text' />
                        </FormControlComponent>
                            <FormControlComponent
                                label={<FormattedMessage id='crIssueDate' />}
                                fieldId='crIssueDate'
                                // // value={fields['crIssueDate']}
                                required
                                colSize={[2, 4]}
                                onChange={handleFieldUpdate}
                                // errorMessage={this.getError('crIssueDate')}
                            >
                                <input type='text' />
                            </FormControlComponent>
                            </FormGroupComponent>
                <FormGroupComponent>
                    <FormControlComponent
                            label={<FormattedMessage id='crEndDate' />}
                        fieldId='crEndDate'
                        // // value={fields['crEndDate']}
                        required
                        colSize={[2, 4]}
                        onChange={handleFieldUpdate}
                        // errorMessage={this.getError('crEndDate')}
                    >
                        <input  type='text' />
                    </FormControlComponent>
                </FormGroupComponent>
            </div>
        )
    }
    renderMaps() {
        let { handleFieldUpdate, fields } = this.props
    return(
            <div>
            <SubtitleComponent title={<FormattedMessage id='selectAddress' />} isFirst={false} />

        <div className="form-horizontal">
            <div className="formGroup">
                    {/* {this.getError('location')} */}
                {/* <LocationContainer handleFieldUpdate={handleFieldUpdate} isEditable={true} /> */}
            </div>
         </div>
        </div>
        )}


    submitRequest() {
        this.props.handleSubmit();
        //this.props.history.push("/");

    }

    renderUserInfo() {
        let { handleFieldUpdate, fields } = this.props

        return (
            <div>
                <SubtitleComponent title={<FormattedMessage id='userInfo' />} isFirst={false} />
                <FormGroupComponent>
                    <FormControlComponent
                        label={<FormattedMessage id='email' />}
                        fieldId='email'
                        // value={fields['email']}
                        required
                        colSize={[2, 4]}
                        onChange={handleFieldUpdate}
                        // errorMessage={this.getError('email')}
                    >
                        <input type='text' />
                    </FormControlComponent>
                    <FormControlComponent
                        label={<FormattedMessage id='mobileNumber' />}
                        fieldId='mobileNumber'
                        // value={fields['mobileNumber']}
                        required
                        colSize={[2, 4]}
                        onChange={handleFieldUpdate}
                        // errorMessage={this.getError('mobileNumber')}
                    >
                        <input type='text' />
                    </FormControlComponent>
                </FormGroupComponent>
                <FormGroupComponent>
                    <FormControlComponent
                        label={<FormattedMessage id='password' />}
                        fieldId='email'
                        // value={fields['email']}
                        required
                        colSize={[2, 4]}
                        onChange={handleFieldUpdate}
                        // errorMessage={this.getError('email')}
                    >
                        <input type='text' />
                    </FormControlComponent>
                    <FormControlComponent
                        label={<FormattedMessage id='rePassword' />}
                        fieldId='mobileNumber'
                        // value={fields['mobileNumber']}
                        required
                        colSize={[2, 4]}
                        onChange={handleFieldUpdate}
                        // errorMessage={this.getError('mobileNumber')}
                    >
                        <input type='text' />
                    </FormControlComponent>
                </FormGroupComponent>
               </div>
                     )
             }

    renderAttachment() {
        let { handleFieldUpdate, fields } = this.props
        return (
            <div>
                <SubtitleComponent title={<FormattedMessage id='financalTitle' />} isFirst={false} />
                <FormGroupComponent>
                    <FormControlComponent
                        label={<FormattedMessage id='bankIBAN' />}
                        fieldId='email'
                        // value={fields['email']}
                        
                        colSize={[2, 4]}
                        onChange={handleFieldUpdate}
                        // errorMessage={this.getError('email')}
                    >
                        <input type='text' />
                    </FormControlComponent>
                    <FormControlComponent
                        label={<FormattedMessage id='bankIBANOwnerName' />}
                        fieldId='mobileNumber'
                        // value={fields['mobileNumber']}
                        
                        colSize={[2, 4]}
                        onChange={handleFieldUpdate}
                        // errorMessage={this.getError('mobileNumber')}
                    >
                        <input type='text' />
                    </FormControlComponent>
                </FormGroupComponent>
            </div>
        )
    }
    renderButtons(){

return(
    <div className="pageActions">

            <button id='goBack' type='submit' className='btn btn-secondary' onClick={this.backHome} >
                <FormattedMessage id='back' />
            </button>
        <button id='cancel-reg' className='btn btn-primary ' onClick={this.submitRequest}>
            <FormattedMessage id='save' />
        </button>
    </div>
)
    }
    onTermsSelect(event){
        this.props.handleFieldUpdate('termsAndConditions',event.target.checked)

    }
renderTerms(){
    return(
        <div className="accept-terms-conditions">
            <div className="checkboxItem form-check-inline">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="gridCheckbox4" onClick={this.onTermsSelect} />
                    <label className="form-check-label" for="gridCheckbox4"> قرات وموافق علي
                                                    <a href="javascript:;" onClick={this.props.showModal} className=" underline" data-toggle="modal" data-target="#TermsAndConditions">
                                <b> الشروط والاحكام </b>
                            </a>
                        </label>
                    {/* <span className="error-block px-4">  {this.getError('termsAndConditions')} </span> */}

                        </div>
                </div>
            </div>
    )
}

backHome(){
    window.location.href='/';
    //this.props.history.push('/')
    this.props.resetFields()
}
    showSuccessMsg() {
        return (

                <section>
                <div className="Big-message my-5 text-center">
                    <i className="fa fa-check text-success" aria-hidden="true"></i>
                    <h3 className="text-success"> تم التسجيل بنجاح </h3>
                    <p>رقم الطلب <b className="text-dark"> {Math.floor(Math.random() * 1000000000)} </b> </p>
                    <p> العودة للصفحة   <a href="javascript:;" onClick={this.backHome} className="font-color">  الرئيسية </a></p>
                    </div>
                </section>

        )
    }
    modal(){
        let { showModal, hideModal, isModalDisplayed} = this.props
        return (
            <ModalComponent showModal={isModalDisplayed} title={<FormattedMessage id="termsAndConditionMsg" />} onDestroy={hideModal}>

                <div className="modal-body terms-conditions-details">
                    <h5>عنوان اول</h5>
                    <p>
                        نود إشعاركم بأننا ملتزمون تجاهكم وحريصون كل الحرص على ضمان سرية معلوماتكم وذلك وفق أدق معايير الأمن والسرية كما نلتزم بقصر
                        استخدام وإدارة المعلومات على أدنى حد نحتاجه كما أنه لن يتم الكشف عن أية معلومات تخصكم لأي جهة خارجية
                        إلا ما كان مطلوباً بموجب القانون أو إذا كان الغرض هو للدفاع عن أو حماية أو بموجب أمر من سلطة قضائية
                        أو تنظيمية حقوق الشركة كما نفيدكم بإقتصار صلاحية الاطلاع على المعلومات على الاشخاص المصرح لهم فقط.
                        علماً بأن أي موظف ينتهك هذا الالتزام سيكون عرضة للمساءلة القانونية المعمول بها في الشركة. كما نود
                        إخطاركم بأننا نحتفظ بالحق في تعديل بنود وشروط سياسة سرية المعلومات إن لزم الأمر مع علم بأننا سنقوم
                        بإشعاركم بأي تعديل وذلك بالنشر على موقعنا هذا. يعتبر إرسال أي مقترح أو فكره لشركة عِلم لأمن المعلومات
                        تصريح لها بإستخدامه والتصرف به حسب ماتراه دون إلتزام منها بأي حقوق مالية أو أدبية تجاه المرسل.&#8203;&#8203;
                    </p>
                    <br/>
                        <h5>عنوان ثاني</h5>
                        <p>تحتفظ شركة عٍلم لأمن المعلومات بحقوق النشر وأي حقوق ملكية فكرية أخرى في جميع محتويات هذا الموقع وفي الرموز
                            التي يتضمنها، أو تلك الحقوق التي تحصل على إذن من مالكها لتضمينها في هذا الموقع، ولا يحق لمستخدم الموقع
                            نسخ أي من محتويات هذا الموقع أو طباعته أو تحميله أو نقله بأي شكل أو وسيلة الكترونية أو أي نظام لخزن
                            البيانات واستخراجها إلا للاستعمال الشخصي أو داخل الشركة أو المنظمة التي يتبع لها المستخدم ، ويجب
                            أن تحتفظ أي نسخ تتم لهذا الغرض بجميع علامات وإشعارات حقوق النشر والملكية بنفس الشكل والطريقة الموضحة
                            على الأصل. كما يحظر على مستخدم الموقع نسخ أو حفظ أي جزء من هذا الموقع أو محتوياته في أي موقع آخر
                            أو حفظه في أي نظام الكتروني عام أو خاص لاستخلاص البيانات بدون موافقة خطية مسبقة من شركة علم لأمن
                        المعلومات.&#8203; </p>
                </div>

                <ModalFooterComponent>
                    <button className='btn btn-primary' onClick={hideModal} >
                        <FormattedMessage id="back" />
                    </button>
                </ModalFooterComponent>
            </ModalComponent>
        )
    }
    render() {

        return (
            <PageContentComponent title={<FormattedMessage id='selfRegistraion' />}>
                {this.modal()}
                {!this.props.submitted && this.renderCorpprateInfo()}
                {!this.props.submitted && this.renderUserInfo()}
                {!this.props.submitted && this.renderAttachment()}
                {!this.props.submitted && this.renderMaps()}
                {!this.props.submitted && this.renderTerms()}
                {!this.props.submitted && this.renderButtons()}
                {this.props.submitted && this.showSuccessMsg()}
            </PageContentComponent>

        )
    }
}

SelfRegistrationComponent.propTypes = {
    locale:PropTypes.string.isRequired,
    fields:PropTypes.object.isRequired,
    submitted: PropTypes.bool.isRequired,
    isModalDisplayed: PropTypes.bool.isRequired,
    resetFields: PropTypes.func.isRequired,
    handleFieldUpdate:PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    valiadationErrors:PropTypes.object.isRequired,
}
