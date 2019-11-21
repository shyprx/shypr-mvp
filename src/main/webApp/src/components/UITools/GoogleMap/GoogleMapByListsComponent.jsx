import React from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'
import { Gmaps, Marker } from 'react-gmaps'
import { geolocated, geoPropTypes } from 'react-geolocated'
import axios from 'axios'
import './GoogleMap.css'
import i18n from '../../../i18n'
import FormGroupComponent from '../../Form/FromGroupComponent'
import FormControlComponent from '../../Form/FormControlComponent'
import {  maxLength, isNumeric, isArabic, isEnglish, } from '../../../util/validators/ValidationUtil'
import api from "../../../util/api";


const KSA_BOUNDS = {  maxLat: 32.154284, minLat: 16.0036, maxLng: 55.6666999, minLng: 34.5299999, }
const MIN_ZOOM_LEVEL = 5
const API_KEY = 'AIzaSyCpzpgVwC_wkPhHV_ye9B1xs9FF7aQ6PMA'

class GoogleMapListsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: this.props.isEditable ? props.editLocation ? props.region  : null :props.region  ,
      city: this.props.isEditable ?  props.editLocation ? props.city  : null :props.city  ,
      regions : [] ,
      cities : [] ,
      route: this.props.isEditable ? props.editLocation ? props.route  : null  :props.route  ,
      routeEn: this.props.isEditable ? props.editLocation ? props.routeEn  : null  :props.routeEn  ,
      district: this.props.isEditable ? props.editLocation ? props.district  : null   :props.district  ,
      districtEn : this.props.isEditable ? props.editLocation ? props.districtEn  : null  :props.districtEn  ,
      postal_code :  this.props.isEditable ? props.editLocation ? props.postal_code  : null  :props.postal_code  ,
      buildingNumber : this.props.isEditable ? props.editLocation ? props.buildingNumber  : null  :props.buildingNumber  ,

      currentLocation: { lat: this.props.lat, lng: this.props.lng } ,
      map: null,
      mapZoom: 14,
      lang: this.props.locale,
      outOfKSA: false,
      invalidLocation: false,
    }

    this.onMapCreated = this.onMapCreated.bind(this)
    this.onClick = this.onClick.bind(this)
    this.setLocationDetails = this.setLocationDetails.bind(this)
    this.clearLocationDetails = this.clearLocationDetails.bind(this)
    this.onZoomChanged = this.onZoomChanged.bind(this)
    this.getRegions()  

    
  }

  componentWillUnmount() {
    window.removeEventListener('onClick', this.onClick, false)
    window.removeEventListener('onMapCreated', this.onMapCreated, false)
    window.removeEventListener('onZoomChanged', this.onZoomChanged, false)    
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: false,
      clickableIcons: false,
      minZoom: MIN_ZOOM_LEVEL,
      styles: [
        { featureType: 'administrative.country', elementType: 'labels', stylers: [{ visibility: 'off' }] },
        { featureType: 'water', elementType: 'labels', stylers: [{ visibility: 'off' }] }],
    })
    if (!this.props.isEditable) {
      map.setOptions({ draggable: false })
      this.setState({ mapZoom: 11 })
    }
    this.setState({ map })
  }

  onZoomChanged() {
    const minZoom = 11
    if (!this.props.isEditable && this.state.map.getZoom() < minZoom) {
      this.setState({ mapZoom: minZoom })
    }
  }

  onClick(e) {
    if (!this.props.isEditable) {
      return
    }

    let lat = e.latLng.lat();
    let lng = e.latLng.lng() ;
    const currentZoomLevel = this.state.map.getZoom()

    if (  lat > KSA_BOUNDS.maxLat ||  lat < KSA_BOUNDS.minLat || lng > KSA_BOUNDS.maxLng || lng< KSA_BOUNDS.minLng ) {
      lat = this.state.selectCity.lat ;
      lng = this.state.selectCity.lng ;
    } 
    this.setState({
      currentLocation: { lat: lat, lng: lng },
      mapZoom: currentZoomLevel,
    })
    this.setLocationDetails(lat , lng )
  }

  setLocationDetails(lat , lng ) {
    const axiosInstance = axios.create({ headers: {} }) // remove field X-Requested-With frome header for geocode APIs request because it is not allowed by Access-Control-Allow-Headers in preflight response.

  
    axiosInstance.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&language=ar&key=${API_KEY}`)
      .then((response) => {
        if (response.data.status === 'OK') {
          const locationDetails = this.gotLocation(response.data.results)
          if (!locationDetails ) {
            this.setState({ outOfKSA: true, invalidLocation: true, ...this.clearLocationDetails() })
            this.props.handleFieldUpdate('all_ar', null)
          } else {
            locationDetails.lat = lat
            locationDetails.lng = lng
            this.setState({ outOfKSA: false, invalidLocation: false, ...locationDetails })
            this.props.handleFieldUpdate('all_ar', locationDetails)
          }
        } else {
          this.setState({ invalidLocation: true, outOfKSA: false, ...this.clearLocationDetails() })
          this.props.handleFieldUpdate('all_ar', null)
        }
      }).catch(error => /* TODO:catchError) */ error)

    axiosInstance.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&language=en&key=${API_KEY}`)
      .then((response) => {
        if (response.data.status === 'OK') {
          const locationDetails = this.gotLocationEn(response.data.results)
          if (!locationDetails ) {
            this.setState({ outOfKSA: true, invalidLocation: true, ...this.clearLocationDetails() })
            this.props.handleFieldUpdate('all_en', null)
          } else {
            locationDetails.lat = lat
            locationDetails.lng = lng
            this.setState({ outOfKSA: false, invalidLocation: false, ...locationDetails })
            this.props.handleFieldUpdate('all_en', locationDetails)
          }
        } else {
          this.setState({ invalidLocation: true, outOfKSA: false, ...this.clearLocationDetails() })
          this.props.handleFieldUpdate('all_en', null)
        }
      }).catch(error => /* TODO:catchError) */ error)
  }

  getError = id => ''

  onFieldChange = (id, value) => {
    switch (id) {
    case 'district':
      this.setState({ district: value })
      this.props.handleFieldUpdate('districtAr', value)
      break
    case 'street':
      this.setState({ route: value })
      this.props.handleFieldUpdate('routeAr', value)
      break
    case 'districtEn':
      this.setState({ districtEn: value })
      this.props.handleFieldUpdate('districtEn', value)
      break
    case 'streetEn':
      this.setState({ routeEn: value })
      this.props.handleFieldUpdate('routeEn', value)
      break
    case 'buildingNumber':
      if (!isNumeric(value) || !maxLength(value, 5)){
        return
      } 
      this.setState({ buildingNumber: value })
      this.props.handleFieldUpdate('buildingNumber', value)
      break
    case 'postal_code':
    if (!isNumeric(value) || !maxLength(value, 5)){
      return
    } 
      this.setState({ postal_code: value })
      this.props.handleFieldUpdate('postal_code', value)
    break

    case 'region':
       const selected = this.state.regions.find(city=> city.id == value ) ;

       this.props.handleFieldUpdate('region',selected )
       this.props.handleFieldUpdate('city', null)

       this.setState({region : value , city : null ,selectCity : null ,   })
       this.getCities(value)

     break ; 

     case 'city':
        if(value != null && value != '') {
          const selected = this.state.cities.filter(city=> city.id == value )[0] ;
          this.props.handleFieldUpdate('city', selected)
          this.setState({ selectCity : selected ,   city : value , mapZoom : 14 , currentLocation: { lat: selected.lat , lng: selected.lng} })
          this.setLocationDetails( selected.lat  ,  selected.lng ) ;
        } else {
          this.props.handleFieldUpdate('city', null)
          this.setState({ selectCity : null ,   city : value , mapZoom : 14 })
        }
      break ; 

    }
  }
  
  getAddressComponent(address, type, short_name) {
    let comp = null
    const i = 0
    for (const t of type) {
      comp = address.find(element => element.types.includes(t))
      if (comp) {
        break
      }
    }
    if (comp) {
      return short_name ? comp.short_name : comp.long_name
    }
    return ''
  }

  gotLocation(address) {
    const ld = {
      country: '',
      district: '',
      route: '',
      postal_code: '',
    }
    for (const element of address) {
      if (ld.country && ld.country !== 'SA') {
        return null
      }
      if (ld.country  && ld.district && ld.route && ld.postal_code) {
        return ld
      }
      if (!ld.country) {
        ld.country = this.getAddressComponent(element.address_components, ['country'], true)
      }
     
      if (!ld.district) {
        ld.district = this.getAddressComponent(element.address_components, ['sublocality', 'neighborhood'])
      }
      if (!ld.route) {
        ld.route = this.getAddressComponent(element.address_components, ['route'])
        ld.route === 'Unnamed Road' || !isArabic(ld.route) ? ld.route = '' : ld.route = ld.route
      }
      if (!ld.postal_code) {
        ld.postal_code = this.getAddressComponent(element.address_components, ['postal_code'])
      }
    }
    return ld
  }

  gotLocationEn(address) {
    const ld = {
      countryEn: '',
      districtEn: '',
      routeEn: '',
      postal_codeEn: '',
    }
    for (const element of address) {
      if (ld.countryEn && ld.countryEn !== 'SA') {
        return null
      }
      if (ld.countryEn  && ld.districtEn && ld.routeEn && ld.postal_codeEn) {
        return ld
      }
      if (!ld.countryEn) {
        ld.countryEn = this.getAddressComponent(element.address_components, ['country'], true)
      }
      
      if (!ld.districtEn) {
        ld.districtEn = this.getAddressComponent(element.address_components, ['sublocality', 'neighborhood'])
      }
      if (!ld.routeEn) {
        ld.routeEn = this.getAddressComponent(element.address_components, ['route'])
        ld.routeEn === 'Unnamed Road' || !isEnglish(ld.routeEn) ? ld.routeEn = '' : ld.routeEn = ld.routeEn
      }
      if (!ld.postal_codeEn) {
        ld.postal_codeEn = this.getAddressComponent(element.address_components, ['postal_code'])
      }
    }
    return ld
  }

  clearLocationDetails() {
    return {
         route: '', district: '',    countryEn: '',    districtEn: '',  routeEn: '', postal_code :'' , postal_codeEn : ''
    }
  }

  componentWillReceiveProps(newProps) {
  }


  componentDidMount() {
    if (!this.props.isEditable || this.props.lat || this.props.lng) {
      this.setState({
        currentLocation: { lat: this.props.lat, lng: this.props.lng },
      })
      return
    }
  }

  getRegions = () => {
    axios.get(api.PUBLIC_GET_REGIONS_URL)
      .then(response => {
        this.setState({ regions: response.data })
      }).catch((error) => {
        const { data } = error.response
        const errorKey = data && data.key ? data.key : 'generalErrorMessage' 
        this.setState({ loaderOn: false, errorKey })
      })
  }

  getCities = (regionId) => {
    this.setState({ cities: [] , city:null })

    axios.get(api.PUBLIC_GET_REGIONS_URL + '/' + regionId + '/cities')
      .then(response => {
        this.setState({ cities: response.data , city:null })
      }).catch((error) => {
        const { data } = error.response
        const errorKey = data && data.key ? data.key : 'generalErrorMessage' 
        this.setState({ loaderOn: false, errorKey })
      })
  }

  getCitiesWithoutChange = (regionId) => {
    this.setState({ cities: [] , city:null })

    axios.get(api.PUBLIC_GET_REGIONS_URL + '/' + regionId + '/cities')
      .then(response => {
        this.setState({ cities: response.data , city : this.props.city})
      }).catch((error) => {
        const { data } = error.response
        const errorKey = data && data.key ? data.key : 'generalErrorMessage' 
        this.setState({ loaderOn: false, errorKey })
      })
  }

  render() {
    let drawMap = true 
    const { isRequired  , isEditable , editLocation } = this.props

    if( this.state.region == '' ||  this.state.region == null || this.state.city == '' || this.state.city == null ) {
      drawMap = false  ;
    }
   
    return (
        <React.Fragment> 
        { (!isEditable || editLocation )
          ? (
<     span>
            <div className="row">
              <div className="col-md-2"><label className="staticLabels"><Trans i18nKey='region' /></label></div>
              <div className="col-md-4"><div className="formControlStatic">{i18n.language === 'ar' ? this.state.region.arName : this.state.region.enName}</div></div>
              <div className="col-md-2"><label className="staticLabels"><Trans i18nKey='city' /></label></div>
              <div className="col-md-4"><div className="formControlStatic">{i18n.language === 'ar' ? this.state.city.arName : this.state.city.enName }</div></div>
            </div>
           
          </span>
        )
          : (

        <FormGroupComponent>
          <FormControlComponent
            label={<Trans i18nKey='region' />}
            fieldId='region'
            value={this.state.region}
            required 
            errorMessage={isRequired && !this.state.region && <Trans i18nKey='errorMessage.isRequired' values={{ name: i18n.t('region') }} />}
            onChange={this.onFieldChange}
            colSize={[2, 4]}
          >
            <select disabled={!this.props.isEditable }>
              <option value=''>
                {i18n.t('selectRegion')}
              </option>
              {this.state.regions.map( ( region , index )=> (
                <option key={index} value={region.id}>
                  {i18n.language === 'ar' ? region.arName : region.enName}
                </option>
              ))
              }
            </select>
          </FormControlComponent>
          <FormControlComponent
            label={<Trans i18nKey='city' />}
            fieldId='city'
            value={this.state.city}
            required
            errorMessage={isRequired && !this.state.city && <Trans i18nKey='errorMessage.isRequired' values={{ name: i18n.t('city') }} />}
            onChange={this.onFieldChange}
            colSize={[2, 4]}
          >
            <select disabled={!this.state.region || !this.props.isEditable}>
              <option value=''>  {i18n.t('selectCity')}  </option>
           
              {this.state.cities.map( ( city , index ) => (
                <option key={index} value={city.id}>
                  {i18n.language === 'ar' ? city.arName : city.enName}
                </option>
              ))
              }
            </select>
          </FormControlComponent>
        </FormGroupComponent>
          ) }

        { 
          drawMap && this.drawTheMap() 
        }
       </React.Fragment> 
    )
  }


  drawTheMap = () => {
    const lat = this.state.lat && parseFloat( this.state.lat).toFixed(5)
    const lng = this.state.lng && parseFloat( this.state.lng).toFixed(5)
    const { isRequired } = this.props
    
    return ( 
      
      <div className="formGroup">
       
        <div className={this.state.outOfKSA || this.state.invalidLocation ? 'addressDetailsError' : 'addressDetails'}>
          <div id="gmap_canvas" className="mapContainer">
            <Gmaps
              width="100%"
              height="100%"
              lat={this.state.currentLocation.lat}
              lng={this.state.currentLocation.lng}
              zoom={this.state.mapZoom}
              loadingMessage="loading"
              onClick={this.onClick}
              params={{ v: '3.exp', key: API_KEY }}
              onMapCreated={this.onMapCreated}
              onZoomChanged={this.onZoomChanged}
            >
              <Marker
                lat={this.state.currentLocation.lat}
                lng={this.state.currentLocation.lng}
                draggable={false}
              />
            </Gmaps>
          </div>
          <div className="mapLocation">
            
            
            {!this.props.isEditable
              ? (
<span>
                <div className="row">
                  <div className="col-md-2"><label className="staticLabels"><Trans i18nKey='district' /></label></div>
                  <div className="col-md-4"><div className="formControlStatic">{i18n.language === 'ar' ? this.state.district : this.state.districtEn}</div></div>
                  <div className="col-md-2"><label className="staticLabels"><Trans i18nKey='street' /></label></div>
                  <div className="col-md-4"><div className="formControlStatic">{i18n.language === 'ar' ? this.state.route : this.state.routeEn}</div></div>
                </div>
                <div className="row">
                  <div className="col-md-2"><label className="staticLabels"><Trans i18nKey='postalCode' /></label></div>
                  <div className="col-md-4"><div className="formControlStatic">{this.state.postal_code}</div></div>
                  <div className="col-md-2"><label className="staticLabels"><Trans i18nKey='buildingNo' /></label></div>
                  <div className="col-md-4"><div className="formControlStatic">{this.state.buildingNumber}</div></div>
                </div>
              </span>
)
              : (
<span>
                <FormGroupComponent>
                  <FormControlComponent
                    label={<Trans i18nKey='districtAr' />}
                    fieldId='district'
                    value={this.state.district}
                    clearable="true"
                    required
                    errorMessage={isRequired && !this.state.district && <Trans i18nKey='errorMessage.isRequired' values={{ name: i18n.t('districtAr') }} />}
                    onChange={this.onFieldChange}
                    colSize={[2, 4]}
                  >
                    <input type='text' className="form-control" />
                  </FormControlComponent>

                  <FormControlComponent
                    label={<Trans i18nKey='streetAr' />}
                    fieldId='street'
                    clearable="true"
                    value={this.state.route}
                    required
                    errorMessage={isRequired && !this.state.route && <Trans i18nKey='errorMessage.isRequired' values={{ name: i18n.t('streetAr') }} />}
                    onChange={this.onFieldChange}
                    colSize={[2, 4]}
                  >
                    <input type="text" className="form-control" />
                  </FormControlComponent>
                </FormGroupComponent>

                <FormGroupComponent>
                  <FormControlComponent
                    label={<Trans i18nKey='districtEn' />}
                    fieldId='districtEn'
                    clearable="true"
                    value={this.state.districtEn}
                    required
                    errorMessage={isRequired && !this.state.districtEn && <Trans i18nKey='errorMessage.isRequired' values={{ name: i18n.t('districtEn') }} />}
                    onChange={this.onFieldChange}
                    colSize={[2, 4]}
                  >
                    <input type='text' className="form-control" />
                  </FormControlComponent>

                  <FormControlComponent
                    label={<Trans i18nKey='streetEn' />}
                    fieldId='streetEn'
                    clearable="true"
                    value={this.state.routeEn}
                    required
                    errorMessage={isRequired && !this.state.routeEn && <Trans i18nKey='errorMessage.isRequired' values={{ name: i18n.t('streetEn') }} />}
                    onChange={this.onFieldChange}
                    colSize={[2, 4]}
                  >
                    <input type="text" className="form-control" />
                  </FormControlComponent>
                </FormGroupComponent>

                <FormGroupComponent>
                  <FormControlComponent
                    label={<Trans i18nKey='postalCode' />}
                    fieldId='postal_code'
                    value={this.state.postal_code}
                    required
                    clearable="true"
                    errorMessage={isRequired && !this.state.postal_code && <Trans i18nKey='errorMessage.isRequired' values={{ name: i18n.t('postal_code') }} />}
                    onChange={this.onFieldChange}
                    colSize={[2, 4]}
                  >
                    <input type="text" className="form-control" />
                  </FormControlComponent>
                  <FormControlComponent
                    label={<Trans i18nKey='buildingNo' />}
                    fieldId='buildingNumber'
                    clearable="true"
                    value={this.state.buildingNumber}
                    errorMessage={this.props.errorMessage}
                    onChange={this.onFieldChange}
                    colSize={[2, 4]}
                  >
                    <input type='text' className="form-control" />
                  </FormControlComponent>
                </FormGroupComponent>
              </span>
)
            }
          </div>
        </div>
      </div>
   )
  }



} export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 15000,
})(GoogleMapListsComponent)

GoogleMapListsComponent.propTypes = {
  ...GoogleMapListsComponent.PropTypes,
  ...geoPropTypes,
  isEditable: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  lat: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  lng: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  handleFieldUpdate: PropTypes.func,
}
GoogleMapListsComponent.defaultProps = {
  lat: 24.788879,
  lng: 46.637646,
  isEditable: true,
  errorMessage: '',
}

