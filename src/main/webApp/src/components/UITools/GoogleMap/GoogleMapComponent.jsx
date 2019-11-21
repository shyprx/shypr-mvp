/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'
import { Gmaps, Marker } from 'react-gmaps'
import { geolocated, geoPropTypes } from 'react-geolocated'
import axios from 'axios'
import './GoogleMap.css'
import { AR } from '../../../constants/LocaleConstants'
import i18n from '../../../i18n'
import FormGroupComponent from '../../Form/FromGroupComponent'
import FormControlComponent from '../../Form/FormControlComponent'
import {
  maxLength, isNumeric, isArabic, isEnglish,
} from '../../../util/validators/ValidationUtil'


const KSA_BOUNDS = {
  maxLat: 32.154284, minLat: 16.0036, maxLng: 55.6666999, minLng: 34.5299999,
}
const DEFAULT_LOCATION = { lat: 24.712997537543572, lng: 46.67235236596753 }
const MIN_ZOOM_LEVEL = 5
const API_KEY = 'AIzaSyCpzpgVwC_wkPhHV_ye9B1xs9FF7aQ6PMA'
class GoogleMapComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: null,
      city: null,
      route: null,
      district: null,
      currentLocation: { lat: this.props.lat, lng: this.props.lng },
      map: null,
      mapZoom: 14,
      lang: this.props.locale,
      outOfKSA: false,
      invalidLocation: false,
    }
    this.onMapCreated = this.onMapCreated.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onClick = this.onClick.bind(this)
    this.setLocationDetails = this.setLocationDetails.bind(this)
    this.clearLocationDetails = this.clearLocationDetails.bind(this)
    this.onZoomChanged = this.onZoomChanged.bind(this)
    this.setLocationDetails()
  }

  componentWillUnmount() {
    window.removeEventListener('onClick', this.onClick, false)
    window.removeEventListener('onMapCreated', this.onMapCreated, false)
    window.removeEventListener('onDragEnd', this.onDragEnd, false)
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

  onDragEnd() {
    let centerLat = this.state.map.getCenter().lat()
    let centerLng = this.state.map.getCenter().lng()
    if (centerLat > KSA_BOUNDS.maxLat) { centerLat = KSA_BOUNDS.maxLat }
    if (centerLat < KSA_BOUNDS.minLat) { centerLat = KSA_BOUNDS.minLat }
    if (centerLng > KSA_BOUNDS.maxLng) { centerLng = KSA_BOUNDS.maxLng }
    if (centerLng < KSA_BOUNDS.minLng) { centerLng = KSA_BOUNDS.minLng }
    this.state.map.setCenter({ lat: centerLat, lng: centerLng })
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
    const currentZoomLevel = this.state.map.getZoom()
    this.setState({
      currentLocation: { lat: e.latLng.lat(), lng: e.latLng.lng() },
      mapZoom: currentZoomLevel,
    })
    this.setLocationDetails(this.props.locale)
  }

  setLocationDetails() {
    const axiosInstance = axios.create({ headers: {} }) // remove field X-Requested-With frome header for geocode APIs request because it is not allowed by Access-Control-Allow-Headers in preflight response.

    
    axiosInstance.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.currentLocation.lat},${this.state.currentLocation.lng}&sensor=true&language=ar&key=${API_KEY}`)
      .then((response) => {
        if (response.data.status === 'OK') {
          const locationDetails = this.gotLocation(response.data.results)
          if (!locationDetails || !locationDetails.region || !locationDetails.city) {
            this.setState({ outOfKSA: true, invalidLocation: true, ...this.clearLocationDetails() })
            this.props.handleFieldUpdate('all_ar', null)
          } else {
            locationDetails.lat = this.state.currentLocation.lat
            locationDetails.lng = this.state.currentLocation.lng
            this.setState({ outOfKSA: false, invalidLocation: false, ...locationDetails })
            this.props.handleFieldUpdate('all_ar', locationDetails)
          }
        } else {
          this.setState({ invalidLocation: true, outOfKSA: false, ...this.clearLocationDetails() })
          this.props.handleFieldUpdate('all_ar', null)
        }
      }).catch(error => /* TODO:catchError) */ error)

    axiosInstance.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.currentLocation.lat},${this.state.currentLocation.lng}&sensor=true&language=en&key=${API_KEY}`)
      .then((response) => {
        if (response.data.status === 'OK') {
          const locationDetails = this.gotLocationEn(response.data.results)
          if (!locationDetails || !locationDetails.regionEn || !locationDetails.cityEn) {
            this.setState({ outOfKSA: true, invalidLocation: true, ...this.clearLocationDetails() })
            this.props.handleFieldUpdate('all_en', null)
          } else {
            locationDetails.lat = this.state.currentLocation.lat
            locationDetails.lng = this.state.currentLocation.lng
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
      region: '',
      city: '',
      district: '',
      route: '',
      postal_code: '',
    }
    for (const element of address) {
      if (ld.country && ld.country !== 'SA') {
        return null
      }
      if (ld.country && ld.region && ld.city && ld.district && ld.route && ld.postal_code) {
        return ld
      }
      if (!ld.country) {
        ld.country = this.getAddressComponent(element.address_components, ['country'], true)
      }
      if (!ld.region) {
        ld.region = this.getAddressComponent(element.address_components, ['administrative_area_level_1'])
      }
      if (!ld.city) {
        ld.city = this.getAddressComponent(element.address_components, ['locality', 'administrative_area_level_2'])
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
      regionEn: '',
      cityEn: '',
      districtEn: '',
      routeEn: '',
      postal_codeEn: '',
    }
    for (const element of address) {
      if (ld.countryEn && ld.countryEn !== 'SA') {
        return null
      }
      if (ld.countryEn && ld.regionEn && ld.cityEn && ld.districtEn && ld.routeEn && ld.postal_codeEn) {
        return ld
      }
      if (!ld.countryEn) {
        ld.countryEn = this.getAddressComponent(element.address_components, ['country'], true)
      }
      if (!ld.regionEn) {
        ld.regionEn = this.getAddressComponent(element.address_components, ['administrative_area_level_1'])
      }
      if (!ld.cityEn) {
        ld.cityEn = this.getAddressComponent(element.address_components, ['locality', 'administrative_area_level_2'])
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
      lat: '', lng: '', region: '', city: '', route: '', district: '',
    }
  }

  componentDidMount() {
    if (!this.props.isEditable || this.props.lat || this.props.lng) {
      this.setState({
        currentLocation: { lat: this.props.lat, lng: this.props.lng },
      })
      return
    }
    this.setState({
      currentLocation: DEFAULT_LOCATION,
    })
  }

  componentWillReceiveProps(newProps) {
    // const { lat , lng } = this.state
    // if (lat !== newProps.lat || lng !== newProps.lng) {
    //   this.setState({
    //     currentLocation: { lat: newProps.lat, lng: newProps.lng },
    //   })
    //   this.setLocationDetails(newProps.locale)
    // }

    // if (!this.props.isEditable || this.props.lat || this.props.lng) {
    //   this.setLocationDetails(newProps.locale)
    //   this.setState({
    //     currentLocation: { lat: newProps.lat, lng: newProps.lng },
    //   })
    //   return
    // }
    // if (newProps.isGeolocationAvailable && newProps.isGeolocationEnabled && newProps.coords) {
    //   this.setState({
    //     currentLocation: { lat: newProps.coords.latitude, lng: newProps.coords.longitude },
    //   })
    //   this.setLocationDetails(newProps.locale)
    // }
    // if (this.state.lat && this.state.lng) {
    //   this.setLocationDetails(newProps.locale)
    // }
  }

  render() {
    const lat = this.state.lat && this.state.lat.toFixed(5)
    const lng = this.state.lng && this.state.lng.toFixed(5)
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
              onDragEnd={this.onDragEnd}
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
            <div className="row">
              <div className="col-md-2"><label className="staticLabels"><Trans i18nKey='lat' /></label></div>
              <div className="col-md-4"><div className="formControlStatic">{lat}</div></div>
              <div className="col-md-2"><label className="staticLabels"><Trans i18nKey='lng' /></label></div>
              <div className="col-md-4"><div className="formControlStatic">{lng}</div></div>
            </div>
            <div className="row">
              <div className="col-md-2"><label className="staticLabels"><Trans i18nKey='region' /></label></div>
              <div className="col-md-4"><div className="formControlStatic">{i18n.language === 'ar' ? this.state.region : this.state.regionEn}</div></div>
              <div className="col-md-2"><label className="staticLabels"><Trans i18nKey='city' /></label></div>
              <div className="col-md-4"><div className="formControlStatic">{i18n.language === 'ar' ? this.state.city : this.state.cityEn}</div></div>
            </div>
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
                    errorMessage={isRequired && !this.state.postal_code && <Trans i18nKey='errorMessage.isRequired' values={{ name: i18n.t('postal_code') }} />}
                    onChange={this.onFieldChange}
                    colSize={[2, 4]}
                  >
                    <input type="text" className="form-control" />
                  </FormControlComponent>
                  <FormControlComponent
                    label={<Trans i18nKey='buildingNo' />}
                    fieldId='buildingNumber'
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
})(GoogleMapComponent)

GoogleMapComponent.propTypes = {
  ...GoogleMapComponent.PropTypes,
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
GoogleMapComponent.defaultProps = {
  lat: 24.788879,
  lng: 46.637646,
  isEditable: true,
  errorMessage: '',
}

