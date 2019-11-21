import React , {Fragment} from 'react'
import { Trans, translate } from 'react-i18next'
import axios from 'axios'
import { validators, maxLength, isNumeric, isMoiOrNin,} from '../../util/validators/ValidationUtil'
import InlineMessageComponent from '../UITools/InlineMessage/InlineMessageComponent'
import errorMessage from '../../constants/ErrorConstants'
import i18n from '../../i18n'
import AttachmentsComponent from '../UITools/Attachment/AttachmentsComponent'
import LoaderComponent from '../UITools/Loader/LoaderComponent'
import api from "../../util/api";
import { AR } from "../../constants/LocaleConstants";


export default class FormComponent extends React.Component {
  constructor(props , fields , attchConfigId  ) {
      super(props)  ; 
      this.state = {
        meRequired: null,
        confirmed: false,
        generalError: false,
        errorId: '',
        attchConfigId , 
        attachmentsList :[] ,
        showRequirements: false ,
        fields
      }

     this.attsComponent = React.createRef();
     if(attchConfigId)  this.getAttChmentConfig(attchConfigId)
  }  


  getActionRequirment = (licenceType  , action  , isMain ) => {
    axios.get(api.LICENCE_ALL_REQS_BY_ACTION_AND_MAIN + licenceType ,  {  params: { actionName : action , isMain : isMain } ,    })
      .then((response) => {
        if (response.status === 200 ) {
          this.setState({ requirements : response.data ,  showRequirements :true})
        }
      })
      .catch((error) => { this.handleError(error)  })
  }

  getComittmentRequirment = (requestTypeId, cardType) => {
    axios.get(api.DRIVER_CARD_FET_DRIVER_CARDS_TYPY_COMITMENT + '?requestTypeId='+ requestTypeId + '&typeId=' + cardType)
      .then((response) => {
        if (response.status === 200 ) {
          this.setState({ requirements : response.data ,  showRequirements :true})
        }
      })
      .catch((error) => { this.handleError(error)  })
  }

  onFieldChange = (id, value) => {
    const { fields  } = this.state
    fields[id].value = value ;
    fields[id].isDirty = true ;

    if(fields[id].cascade ) this[fields[id].cascade](value) ;
    
    this.setState({ fields , generalError: false, errorId: '' })
  }

  handleError = (error ,  scroll ) => {
    const { data } = error.response ? error.response : error;
    const errorId = data && data.key ? data.key : 'generalErrorMessage'
    console.log(" handleError :: " + errorId) ;
    this.setState({ loaderOn: false, errorId , messageData : data ? data.data : null });

    if(scroll) {
         window.scrollTo(500, 0);
    } 
  }

  handleBlur = function (id) {
    const { fields  } = this.state
    fields[id].isTouched = true ;
    this.setState({fields});
  }

  getError = ( id , isSubmitting ) => {
    const { fields , submited   } = this.state
    let field =  fields[id];
    
    if( (field.isDirty && field.isTouched ) || submited || isSubmitting ) {
        const fValidators = field.validators ;
          for(let  i=0 ; i < fValidators.length ;i++ ) {
            let fValidator =  fValidators[i]
            if(!fValidator.when || fValidator.when(this.state) )  {
              let er  =   validators[fValidator.name](fValidator.msg)( field.value ) ;  
              const name = i18n.t(id)
              if (er) { 
                 return <Trans i18nKey={errorMessage[er]} values={{ name }} /> 
              }
            }
        };
    }
    return ''
  }

  
  onSave = () => {
    const {  fields   , attachmentConfig  } = this.state
    let {attachmentsList} = this.state ;
    if(!attachmentsList) attachmentsList = [] ;
        
    this.setState({ submited:true   })

    let validAttachment = true;
    for (const configs in attachmentConfig) {
      if (attachmentConfig[configs].required) {
        if (Object.keys(attachmentsList).length > 0) {
          if (!attachmentsList.hasOwnProperty(attachmentConfig[configs].attachmentConfigID + "")) {
            validAttachment = false;
            this.setState({ meRequired: attachmentConfig[configs].attachmentConfigID });
          }
        } else {
          validAttachment = false;
          this.setState({ meRequired: attachmentConfig[configs].attachmentConfigID });
        }
      }
   }

    let error = null ;
     Object.keys(fields).forEach(element => {
          let internal = this.getError(element , true ) ;
        if(internal) error = internal ;
     });

     if(error || !validAttachment )   return ;

    this.callPostDto() ; 
  }

  handleAttachments = (atts, type) => {
    let {  meRequired, attachmentConfig, attachmentsList,  } = this.state
    for (const attachment in attachmentConfig) {
      if (attachmentConfig[attachment].required && attachmentConfig[attachment].attachmentConfigID === type) {
        meRequired = null
      }
    }
    if (atts) {
      meRequired = null
      attachmentsList = atts
    }
    this.setState({ attachmentsList, meRequired  })
  }

  getAttChmentConfig = (attchConfigId , fn  , callback ) => {
     axios.get('/api/v1/file/config/'+attchConfigId)
       .then((response) => {
         let  attachmentConfig = response.data ; 
         if(attachmentConfig && fn) {
           attachmentConfig = attachmentConfig.filter(fn) ;
          
         } 
         if(attachmentConfig && callback) {
             callback(response.data )         
        } 
  
         this.setState({ attchConfigId , attachmentConfig , allAttCng : response.data  })
       }).catch(
         // TODO:
       )
   }

 
  clearAtts = ()=> {
    const {allAttCng} = this.state ;
    this.setState({ attachmentsList : [], meRequired : null  })
    if(allAttCng) {
      allAttCng.forEach( cnf => {console.log("allAttCng ::" + JSON.stringify(cnf)); this.attsComponent.current.deleteAttachment( null , cnf.attachmentConfigID ) } );
    }
  }

  
  renderAttachment = () => {
    const { attachmentConfig, attachmentsList, meRequired , attchConfigId  } = this.state
    const title = <h4><Trans i18nKey='attachments' /></h4>
    return (
      attachmentConfig
        ? (
          <div key='attachment'>
            {title}
            <AttachmentsComponent  ref={this.attsComponent}
              attachmentConfigurationID={attchConfigId}
              attachmentConfig={attachmentConfig}
              handleAttachments={this.handleAttachments}
              lang={i18n.language}
              viewAttachments={attachmentsList}
              requiredAttachmentError={meRequired}
              url='/api/v1/file/'
            />
          </div>
        )
        : null
    )
  }

  renderLoader = () => {
    const { loaderOn  } = this.state
    if(loaderOn)  return <LoaderComponent /> ;
  }

  renderError = () => {
    const { generalError, errorId , messageData } = this.state
   
    if(errorId == "naql.error.service.yesser.down"){
      return <InlineMessageComponent message={i18n.t('generalErrorMessage')} type="error" />;
    }

    else if (errorId == "naql.error.invalid.number.of.vehicle") {
      return <InlineMessageComponent message={<Trans i18nKey={"naql.error.invalid.number.of.vehicle"} values={{ totalNumber:messageData.reqVechicleMain , validNumber: messageData.validVechicleCount }} />} type="error" />;
    } 
    
    else if (errorId == "naql.error.invalid.number.of.ops") {
      return <InlineMessageComponent message={<Trans i18nKey={"naql.error.invalid.number.of.ops"} values={{ totalNumber:messageData.reqOpsMain, validNumber: messageData.validOpsCount }} />} type="error" />;
    } 

    else if(errorId =='cr.used.region'){
      let data =    i18n.language === AR  ?messageData.dataAr :messageData.dataEn ;
      let message = i18n.t(errorId).replace('$region',data)
        return <InlineMessageComponent message={message} type="error" />;
     }

    return (
    <Fragment>
         {errorId  ? (  <InlineMessageComponent  message={<span><Trans i18nKey={errorId} /></span>}  type='error'/> )  : null}
    </Fragment>
    )
  }

}
