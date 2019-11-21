import React from 'react'
import { Trans, translate } from 'react-i18next'
import PropTypes from 'prop-types'
import DropDown from './DropDown'
import './checkbox.css'
import '../../Form/CheckboxButton/CheckboxButton.css'
import '../../Form/Label.css'
import { AR } from '../../../constants/LocaleConstants'
import {
  getMonthName, getHijriMonthNumber, getMonthNumber,
  getHijri, gregorianDays, gregorianMonths, gregorianYears,
  getGregorian, daysInMonth, iterateyears, iterateMonths, iterateDays,
} from './lists'

export default class BirthDayPickerComponent2 extends React.Component {
  constructor(props) {
    super(props)
    this.onYearClick = this.onYearClick.bind(this)
    this.onMonthClick = this.onMonthClick.bind(this)
    this.onDayClick = this.onDayClick.bind(this)
    this.clicked = this.clicked.bind(this)
    this.state = {
      years: iterateyears(),
      months: iterateMonths(this.props.locale),
      days: gregorianDays('', ''),
      checked: true,
      daysInMon: '',
      yearforday: '',
      monthForday: '',
      disableDay: true,
      disableMonth: true,
      monthSelected: this.props.locale === AR ? '\u0627\u0644\u0634\u0647\u0631' : 'Month',
      daySelected: this.props.locale === AR ? '\u0627\u0644\u064A\u0648\u0645' : 'Day',
      selectedYear: this.props.locale === AR ? '\u0627\u0644\u0633\u0646\u0629' : 'Year',

    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.locale !== this.props.locale) {
      if (this.state.checked) {
        this.setState({ months: iterateMonths(nextProps.locale) })
      } else {
        this.setState({ months: gregorianMonths(nextProps.locale) })
      }
    }
  }

  onYearClick(e) {
    this.props.onDateSelect(null)
    const { locale } = this.props
    const monthVal = locale === AR ? '\u0627\u0644\u0634\u0647\u0631' : 'Month'
    const dayVal = locale === AR ? '\u0627\u0644\u064A\u0648\u0645' : 'Day'
    const yearVal = locale === AR ? '\u0627\u0644\u0633\u0646\u0629' : 'Year'
    this.setState({
      monthSelected: monthVal,
      daySelected: dayVal,
      disableDay: true,
      yearforday: e.target.value,
      selectedYear: e.target.value,
      disableMonth: e.target.value === yearVal,
    })
  }

  onMonthClick(e) {
    this.props.onDateSelect(null)
    const { locale } = this.props
    const dayVal = locale === AR ? '\u0627\u0644\u064A\u0648\u0645' : 'Day'
    const selectMonth = locale === AR ? '\u0627\u0644\u0634\u0647\u0631' : 'Month'
    let days
    if (this.state.checked === true) {
      const numDays = daysInMonth(this.state.yearforday, e.target.value)
      days = iterateDays(numDays)
    } else {
      days = gregorianDays(this.state.yearforday, e.target.value)
    }
    this.setState({
      days,
      daysInMon: days,
      monthForday: e.target.value,
      disableDay: e.target.value === selectMonth,
      monthSelected: e.target.value,
      daySelected: dayVal,
    })
  }

  onDayClick(e) {
    const S = this.props.dateIsolator
    const { monthSelected, yearforday, checked } = this.state
    let day = e.target.value
    let month = 0
    this.setState({ daySelected: day })
    if (checked) {
      month = getHijriMonthNumber(monthSelected) + 1
    } else {
      month = getMonthNumber(monthSelected) + 1
    }
    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }
    if (yearforday === 'Invalid date') {
      this.props.onDateSelect(null)
    } else {
      const date = yearforday + S + month + S + day
      this.props.onDateSelect(date)
    }
  }

  clicked(e) {
    const { locale, dateIsolator } = this.props
    const yearVal = locale === AR ? '\u0627\u0644\u0633\u0646\u0629' : 'Year'
    const monthVal = locale === AR ? '\u0627\u0644\u0634\u0647\u0631' : 'Month'
    const dayVal = locale === AR ? '\u0627\u0644\u064A\u0648\u0645' : 'Day'
    const { selectedYear, daySelected, monthSelected } = this.state

    if (e.target.checked === true) {
      this.setState({ checked: e.target.checked, years: iterateyears(), months: iterateMonths(this.props.locale) })
      if (selectedYear !== yearVal && daySelected !== dayVal && monthSelected !== monthVal) {
        const hdates = getHijri(selectedYear, (getMonthNumber(monthSelected)), daySelected)
        this.setState({ monthSelected: getMonthName(hdates[1], 'H'), daySelected: hdates[2], selectedYear: hdates[0] })
        const date = hdates[0] + dateIsolator + hdates[1] + dateIsolator + hdates[2]
        this.props.onDateSelect(date)
      } else {
        this.props.onDateSelect(null)
        this.setState({
          disableDay: true, disableMonth: true, monthSelected: monthVal, selectedYear: yearVal, daySelected: dayVal,
        })
      }
    } else {
      this.setState({ checked: e.target.checked, years: gregorianYears(), months: gregorianMonths(this.props.locale) })
      if (selectedYear !== yearVal && daySelected !== dayVal && monthSelected !== monthVal) {
        const dates = getGregorian(selectedYear, (getHijriMonthNumber(monthSelected)), daySelected)
        this.setState({ monthSelected: getMonthName(dates[1], 'G'), daySelected: dates[2], selectedYear: dates[0] })
        const date = dates[0] + dateIsolator + dates[1] + dateIsolator + dates[2]
        this.props.onDateSelect(date)
      } else {
        this.props.onDateSelect(null)
        this.setState({
          selectedYear: yearVal, daySelected: dayVal, monthSelected: monthVal, disableDay: true, disableMonth: true,
        })
      }
    }
  }

  render() {
    const { locale } = this.props
    const yearVal = locale === AR ? 'سنة' : 'Year'
    const monthVal = locale === AR ? 'شهر' : 'Month'
    const dayVal = locale === AR ? 'يوم' : 'Day'
    return (
      <React.Fragment>
        <div className="col-md-4 col-sm-4">
          <div key={1} className='col-md-2 checkboxItem form-check-inline'>
            <input id='field' type='checkbox' className='checkbox' value='valuable' onChange={this.clicked} checked={this.state.checked} />
            <label className='form-check-label' htmlFor='field' />
            <span className="pointer" htmlFor='field'>
              <Trans i18nKey='hijri' />
            </span>
          </div>
        </div>
        <div className="col-md-2 col-sm-3">
          <DropDown
            value={this.state.daySelected}
            disableClick={this.state.disableDay}
            defultValue={dayVal}
            onclick={this.onDayClick}
            List={this.state.days}
          />
        </div>
        <div className="col-md-3 col-sm-3">
          <DropDown
            value={this.state.monthSelected}
            disableClick={this.state.disableMonth}
            defultValue={monthVal}
            onclick={this.onMonthClick}
            List={this.state.months}
          />
        </div>
        <div className="col-md-3 col-sm-3">
          <DropDown value={this.state.selectedYear} defultValue={yearVal} onclick={this.onYearClick} List={this.state.years} />
        </div>

      </React.Fragment>
    )
  }
}
BirthDayPickerComponent2.propTypes = {
  onDateSelect: PropTypes.func,
  dateIsolator: PropTypes.string.isRequired,
  // locale: PropTypes.string.isRequired,
}
