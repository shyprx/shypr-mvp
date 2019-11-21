import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import DatatableComponent from '../Datatable/DatatableComponent'
import Column from '../Datatable/Column'
import SubTitle from '../Subtitle/SubtitleComponent'
import ExportComponent from '../Export/ExportComponent'
import ActionButtonComponent from '../Form/ActionButtonComponent'
import { AR } from '../../constants/LocaleConstants'

const registrations = [
  {
    organizationId: "11",
    idNumber: '10' ,
    organizationType: 'government',
    crNumber: null,
    crIssueDate: null,
    crEndDate: null,
    residentsId: '1234556',
    sponsoredNumber: '23255665',
    userType: 'saudi',
    birthDate: '1412-01-01',
    email: 'wss@hotmail.com',
    mobileNumber: '050012212' ,
    location: false,
    long: '46.681399299999995',
    lat: '24.709729799999998',
    regionEn: null,
    regionAr: null,
    cityEn: null,
    cityAr: 'الرياض',
    districtEn: null,
    districtAr: null,
    streetEn: null,
    streetAr: null,
    postalCode: '25444',
    phoneNumber: '0114433333',
    faxNumber: null,
    agreementForm: null,
    cr: null,
},
]

class RegistirationListComponent extends Component {
  constructor(props) {
    super(props)
    this.handleTableChange = this.handleTableChange.bind(this)
    this.handleActionsCellRender = this.handleActionsCellRender.bind(this)
    this.renderExport = this.renderExport.bind(this)
    this.onExport = this.onExport.bind(this)
    this.onViewRegistration = this.onViewRegistration.bind(this)
  }

  onExport(type) {
    if (!this.props.isLoading) {
      this.props.onExport(type)
    }
  }

  onViewRegistration(id) {
    if (this.props.isLoading === false) {
      this.props.setActiveRequest(id)
const list = this.props.registrations
const request = list.filter(i => i.mobileNumber === id)
      this.props.history.push({
        pathname: '/ViewRegistration',
        state: { registration: request[0] }
      })
      //this.props.history.push('/ViewLicenseRequest')
}
  }

  handleActionsCellRender(data) {
    const divStyle = { whiteSpace: 'nowrap', textAlign: 'center', cursor: 'pointer' }
    const { locale } = this.props
    const View = locale !== AR ? 'View' : '\u0639\u0631\u0636'    
    return (
      <div style={divStyle}>
        <span>
          <a id={'DT-ViewRegistration' + data.mobileNumber}  onClick={() => this.onViewRegistration(data.mobileNumber)}  title={View} >عرض</a>
        </span>
      </div>
    )
  }

  handleTableChange(page, size, sortCol, sortDir) {
    // const shipments = this.getUsers()
    // return shipments.slice(page * size, (page * size) + size)
    this.props.onTableChange(page, size, sortCol, sortDir)
  }

  renderExport() {
    const { registrations } = this.props
    if (registrations && registrations.length > 0) {
      return (
        <ExportComponent onClick={type => this.onExport(type)} />
      )
    }
    return null
  }

  render() {
    const {
      
      totalRecords,
      isLoading,
      currentSortCol,
      currentSortDir,
      currentPage,
    } = this.props
    const title = 'طلبات التسجيل'
    return (
      <div>

        {this.renderExport()}
        <DatatableComponent
          data={registrations}
          remote
          loading={isLoading}
          pageSize={10}
          total={totalRecords}
          onChange={this.handleTableChange}
          currentPage={currentPage}
          currentSortCol={currentSortCol}
          currentSortDir={currentSortDir}
          indexable
        >
          <Column id="organizationType">
            <FormattedMessage id="organizationType" />
          </Column>
          <Column id="organizationId" isNumeric isKey>
            <FormattedMessage id="organizationId" />
          </Column>
          <Column id="idNumber">
            <FormattedMessage id="idNumber" />
          </Column>
          <Column id="cityAr">
            <FormattedMessage id="city" />
          </Column>
          <Column onCellRender={this.handleActionsCellRender} headerAlign="center">
            <FormattedMessage id="actions" />
          </Column>
        </DatatableComponent>
      </div>
    )
  }
}

RegistirationListComponent.propTypes = {
  locale: PropTypes.string,
  registrations: PropTypes.array,
  totalRecords: PropTypes.number,
  isLoading: PropTypes.bool,
  onTableChange: PropTypes.func,
  currentPage: PropTypes.number,
  currentSortCol: PropTypes.string,
  currentSortDir: PropTypes.string,
  setActiveUser: PropTypes.func,
  onExport: PropTypes.func,
  userRoleLevel: PropTypes.arrayOf(PropTypes.string),
}
export default withRouter(RegistirationListComponent)
