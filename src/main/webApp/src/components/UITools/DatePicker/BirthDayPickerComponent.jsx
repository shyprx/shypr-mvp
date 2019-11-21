import React from 'react'
import { Trans, translate } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  getMonthName, getHijriMonthNumber, getMonthNumber, getHijri, gregorianDays, gregorianMonths, gregorianYears, getGregorian, daysInMonth, iterateyears, iterateMonths, iterateDays,
} from './lists.js'
import DropDown from './DropDown'
import styles from './birthDayPicker.css'
import { AR } from '../../constants/LocaleConstants'

export default class BirthDayPickerComponent extends React.Component {
  constructor(props) {
    super(props)
    this.onYearClick = this.onYearClick.bind(this)
    this.onMonthClick = this.onMonthClick.bind(this)
    this.onDayClick = this.onDayClick.bind(this)
    this.clicked = this.clicked.bind(this)
    this.clickedDropDown = this.clickedDropDown.bind(this)
    this.state = {
      years: iterateyears(),
      months: iterateMonths(this.props.locale),
      days: gregorianDays('', ''),
      checked: this.props.isHijri,
      daysInMon: '',
      yearforday: '',
      monthForday: '',
      disableDay: true,
      disableMonth: true,
      monthSelected: this.props.locale === AR ? '\u0627\u0644\u0634\u0647\u0631' : 'Month',
      daySelected: this.props.locale === AR ? '\u0627\u0644\u064A\u0648\u0645' : 'Day',
      selectedYear: this.props.locale === AR ? '\u0627\u0644\u0633\u0646\u0629' : 'Year',
      isEnable: this.props.isEnable,
      selectValue: this.props.isHijri,
      currentvalue: this.props.currentvalue || '',
    }
  }

  componentWillMount() {
    const { locale, dateIsolator } = this.props
    const yearVal = locale === AR ? '\u0627\u0644\u0633\u0646\u0629' : 'Year'
    const monthVal = locale === AR ? '\u0627\u0644\u0634\u0647\u0631' : 'Month'
    const dayVal = locale === AR ? '\u0627\u0644\u064A\u0648\u0645' : 'Day'
    const { selectedYear, daySelected, monthSelected } = this.state
    // this.props.onCascadeDate ? this.props.onCascadeDate(e) : null
    if (this.state.selectValue) {
      this.setState({ selectValue: 1, years: iterateyears(), months: iterateMonths(this.props.locale) })
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
      this.setState({ selectValue: 2, years: gregorianYears(), months: gregorianMonths(this.props.locale) })
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
    this.props.isHijri = e.target.checked
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

  clickedDropDown(e) {
    const { locale, dateIsolator } = this.props
    const yearVal = locale === AR ? '\u0627\u0644\u0633\u0646\u0629' : 'Year'
    const monthVal = locale === AR ? '\u0627\u0644\u0634\u0647\u0631' : 'Month'
    const dayVal = locale === AR ? '\u0627\u0644\u064A\u0648\u0645' : 'Day'
    const selectOphijri = locale === AR ? '\u0647\u062c\u0631\u064a' : 'Hijri'
    const { selectedYear, daySelected, monthSelected } = this.state
    this.props.onCascadeDate ? this.props.onCascadeDate(e) : null
    if (e.target.value === selectOphijri) {
      this.setState({ selectValue: e.target.key, years: iterateyears(), months: iterateMonths(this.props.locale) })
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
      this.setState({ selectValue: e.target.key, years: gregorianYears(), months: gregorianMonths(this.props.locale) })
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
    const { locale, currentvalue } = this.props
    const yearVal = currentvalue ? currentvalue.substring(0, 4) : locale === AR ? '\u0627\u0644\u0633\u0646\u0629' : 'Year'
    const monthVal = currentvalue ? currentvalue.substring(5, 7) : locale === AR ? '\u0627\u0644\u0634\u0647\u0631' : 'Month'
    const dayVal = currentvalue ? currentvalue.substring(8, 10) : locale === AR ? '\u0627\u0644\u064A\u0648\u0645' : 'Day'

    return (
      <div>
        {this.props.ComponentType == 'input'
          ? (
            <div className='col-md-3 col-sm-0'>
              {' '}
              <div className='col-1 '>
                <Trans i18nKey={this.state.checked ? 'hijri' : 'gregorian'} />
              </div>
              <div className='col-1 col-sm-1 '>
                {' '}
                <input id='field' type='checkbox' className='checkbox' value='valuable' label='hijri' onChange={this.clicked} checked={this.state.checked} disabled={!this.props.isEnable} />
              </div>
            </div>
          )
          : this.props.ComponentType == 'toggle'
            ? (
              <div className='col-md-3 col-sm-30'>
                <Trans i18nKey={this.state.checked ? 'hijri' : 'gregorian'} />
                <label className="switchControl switch">
                  <input type="checkbox" value={this.state.checked} onChange={this.clicked} checked={this.state.checked} disabled={!this.props.isEnable} />
                  <span className="slider round" />
                </label>
              </div>
            )
            : this.props.ComponentType == 'dropDown' ? (
              <div className='col-md-3 col-sm-0'>
                {' '}
                <select value={this.state.selectValue} className="selectWidth formControl" onChange={this.clickedDropDown} disabled={!this.props.isEnable}>
                  <option key='1'>
                    <Trans i18nKey={this.state.checked ? 'hijri' : 'gregorian'} />
                  </option>
                  <option key='2'>
                    <Trans i18nKey={!this.state.checked ? 'hijri' : 'gregorian'} />
                  </option>
                </select>
              </div>
            ) : null
        }

        <div className="col-md-3 col-sm-1">
          <DropDown value={this.state.selectedYear} defultValue={yearVal} onclick={this.onYearClick} List={this.state.years} isYear="Y" />
        </div>
        <div className="col-md-3 col-sm-1">
          <DropDown
            value={this.state.monthSelected}
            disableClick={this.state.disableMonth}
            defultValue={monthVal}
            isMonth="M"
            onclick={this.onMonthClick}
            List={this.state.months}
          />
        </div>
        <div className="col-md-2 col-sm-0">
          <DropDown
            value={this.state.daySelected}
            disableClick={this.state.disableDay}
            defultValue={dayVal}
            isDay="D"
            onclick={this.onDayClick}
            List={this.state.days}
          />
        </div>

      </div>
    )
  }
}
BirthDayPickerComponent.propTypes = {
  onDateSelect: PropTypes.func,
  dateIsolator: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
}
