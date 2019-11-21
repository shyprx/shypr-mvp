import React from 'react'
import axios from 'axios'
import { Trans  } from 'react-i18next'
import FileSaver from 'file-saver'
import GoogleMapByListsComponent from '../UITools/GoogleMap/GoogleMapByListsComponent'
import i18n from '../../i18n'


export default  class ViewDetailsComponent extends React.Component {

  constructor(props , dataUrl  ) {
    super(props)
    const { viewID } = this.props
    if (!viewID || viewID === '') {
      this.props.goBack()
    }
    this.state = {
      detailsVal : '' ,
      dataUrl : dataUrl , 
      navigation : null  ,
    }
  }

  componentWillMount = () => {
    const { viewID } = this.props
    const { dataUrl } = this.state
    this.setState({  loaderOn: true   })

    axios.get( dataUrl +'/' + viewID.id)
      .then((response) => {
        if (response.status === 200 && response.data) {
          this.setState({  loaderOn: false,   detailsVal : response.data   })
        }
      })
      .catch((error) => {
        const { data } = error.response
        const errorKey = data && data.key ? data.key : 'generalErrorMessage' 
        this.setState({ loaderOn: false, errorKey })
      })
  }

  getError(id) {
    const { errors } = this.state
    return errors[id]
  }

  successMessage = () => {
    const { showSuccessMessage, pageMode } = this.state
    if (showSuccessMessage) {
      return (
        <div id='successMsgDiv' className='successHeader'>
          <div className='onlySuccessMessage'>
            <span>
              <Trans i18nKey={pageMode === 'VIEW'} />
            </span>
          </div>
          <br />
          <br />
        </div>
      )
    }
    return null
  }

  downloadFile = (url , filename) => {
    const mime = 'application/pdf'
    const headers = { Accept: mime }
    axios.get( url + this.props.viewID.id, { headers, responseType: 'arraybuffer' })
      .then((res) => {
        const blob = new Blob([res.data], { type: mime })
        FileSaver.saveAs(blob, filename )
      }).catch((error) => {
        const { data } = error.response
        const errorKey = data && data.key ? data.key : 'generalErrorMessage' 
        this.setState({ loaderOn: false, errorKey })
      })
  }

  comeback = () => { 
    this.setState({ navigation: null }) 
  }

  setNavigation(nav) {
    this.setState({navigation:nav}) ;
  }

  renderAddress() {
    const title = (
      <h5>  <Trans i18nKey='addresInfo' />  </h5>
    )
    const { viewID } = this.props
    return (
      <div  className="animate fadeInRightLight delay1" >
        {title}
        <div>
          <div>
           <GoogleMapByListsComponent
              lat={viewID.lat}
              lng={viewID.lng}
              region={viewID.city.region}
              city={viewID.city}  
              district={viewID.districtAr} 
              districtEn={viewID.districtEn}
              route={viewID.streetAr}
              routeEn={viewID.streetEn}  
              postal_code={viewID.postalCode}
              buildingNumber={viewID.buildingNumber}
              isEditable={false}
              locale={i18n.language}
            />
          </div>
        </div>
      </div>
    )
  }

} 
