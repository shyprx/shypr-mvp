import momentHijri, { iDaysInMonth } from 'moment-hijri'
import moment from 'moment'

let monthsList = []
const hijriMonths = ['Muharram', 'Safar', 'Rabi-I', 'Rabi-II', 'Jumada -I', 'Jumada -II', 'Rajab', 'Sha’ban', 'Ramadhan', 'Shawwal', 'Thul-Qi’dah', 'Thul-Hijjah']
const iMonthsShort = '\u0645\u062D\u0631\u0645_\u0635\u0641\u0631_\u0631\u0628\u064A\u0639 \u0661_\u0631\u0628\u064A\u0639 \u0662_\u062C\u0645\u0627\u062F\u0649 \u0661_\u062C\u0645\u0627\u062F\u0649 \u0662_\u0631\u062C\u0628_\u0634\u0639\u0628\u0627\u0646_\u0631\u0645\u0636\u0627\u0646_\u0634\u0648\u0627\u0644_\u0630\u0648 \u0627\u0644\u0642\u0639\u062F\u0629_\u0630\u0648 \u0627\u0644\u062D\u062C\u0629'.split('_')
let hijriList = []
export function getHijri(y, m, d) {
  const HijriTOGregorian = momentHijri(y + '/' + m + '/' + d).format('iYYYY/iM/iD').split('/')
  return HijriTOGregorian
}

export function getGregorian(y, m, d) {
  const HijriTOGregorian = momentHijri(y + '-' + m + '-' + d, 'iYYYY/iM/iD').format('YYYY/M/D').split('/')
  return HijriTOGregorian
}
export function getMonthName(index, type) {
  if (type === 'H') {
    return hijriList[index]
  }
  return monthsList[index]
}
export function daysInMonth(x, y) {
  const val = getHijriMonthNumber(y)
  const v = new Date()
  v.setYear(x)
  v.setMonth(val)
  let NOD = iDaysInMonth(v.getFullYear(), v.getMonth())
  if (isNaN(NOD)) {
    NOD = 30
  }
  return NOD
}

export function iterateyears(birth , all ) {
  
  if(all) {
      return iterateAllyears() ;
  }
  const currentYear = new Date().getFullYear(); const
    years = []
  let currentHijriYear = momentHijri().iYear()
  let startYear = null
  let i = 1
  if (birth) {
    startYear = currentHijriYear - 99
    while (currentHijriYear >= startYear) {
      years.push({
        data: currentHijriYear--,
        key: i++,
      })
    }
  } else {
    startYear = currentHijriYear + 10
    while (currentHijriYear <= startYear) {
      years.push({
        data: currentHijriYear++,
        key: i++,
      })
    }
  }


  return years
}

 function iterateAllyears() {
  const  years = []
  let startYear = 1300
  let endYear = 1470
  let i = 1

  while (startYear <= endYear) {
      years.push({
        data: startYear++,
        key: i++,
      })
    }

  return years
}


export function iterateMonths(locale) {
  hijriList = locale === 'ar' ? iMonthsShort : hijriMonths
  const months = []

  let m = 12
  for (let i = 0; i < hijriList.length; i++) {
    months.push({ data: hijriList[i], key: m++ })
  }
  return months
}
export function getHijriMonthNumber(month) {
  const monthIndex = hijriList.findIndex((obj => obj === month))
  return monthIndex
}
export function getMonthNumber(month) {
  const monthIndex = monthsList.findIndex((obj => obj === month))
  return monthIndex
}
export function iterateDays(numofdays) {
  const days = []
  let startDay = 1
  let d = 30
  while (startDay <= numofdays) {
    days.push({
      data: startDay++,
      key: d++,
    })
  }
  return days
}

export function gregorianYears(birth) {
  let currentGYear = moment().year()
  const  years = []
  let i = 1
  if (birth) {
    const startGYear = currentGYear - 99
    while (currentGYear >= startGYear) {
      years.push({
        data: currentGYear--,
        key: i++,
      })
    }
  }
  else {
    const startGYear = currentGYear + 10
    while (currentGYear <= startGYear) {
      years.push({
        data: currentGYear++,
        key: i++,
      })
    }
  }
  return years
}
export function gregorianMonths(locale) {
  const Gmonths = []
  if (locale === 'ar') {
    moment.updateLocale('ar-ly', {
      months: {
        format: '\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A\u0648_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648_\u0623\u063A\u0633\u0637\u0633_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631'.split('_'),
        standalone: '\u064A\u0646\u0627\u064A\u0631_\u0641\u0628\u0631\u0627\u064A\u0631_\u0645\u0627\u0631\u0633_\u0623\u0628\u0631\u064A\u0644_\u0645\u0627\u064A\u0648_\u064A\u0648\u0646\u064A\u0648_\u064A\u0648\u0644\u064A\u0648_\u0623\u063A\u0633\u0637\u0633_\u0633\u0628\u062A\u0645\u0628\u0631_\u0623\u0643\u062A\u0648\u0628\u0631_\u0646\u0648\u0641\u0645\u0628\u0631_\u062F\u064A\u0633\u0645\u0628\u0631'.split('_'),
      },
    })
  } else {
    moment.locale('en')
  }

  monthsList = moment.months()
  let m = 12
  for (let i = 0; i < monthsList.length; i++) {
    Gmonths.push({ data: monthsList[i], key: m++ })
  }

  return Gmonths
}

export function gregorianDays(y, m) {
  const Gdays = []
  const monthIndex = getMonthNumber(m)
  if (monthIndex !== -1) {
    let startGDay = 1
    let d = 30
    let numofdays
    if (y === '' && monthIndex === '') {
      numofdays = 30
    } else {
      numofdays = new Date(y, monthIndex + 1, 0).getDate()
    }
    while (startGDay <= numofdays) {
      Gdays.push({
        data: startGDay++,
        key: d++,
      })
    }
  }
  return Gdays
}
