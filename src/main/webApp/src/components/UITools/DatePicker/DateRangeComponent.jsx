import React from 'react'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates'
export default class DateRangeComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,

    }
  }

  render() {
    return (
      <div>
        <div className="col-md-3 col-sm-3">
        <DateRangePicker
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
        focusedInput={this.state.focusedInput}
        onFocusChange={focusedInput => this.setState({ focusedInput })}
        />
        </div>
      </div>
    )
  }
}
DateRangeComponent.propTypes = {
  ontestClick: React.PropTypes.func,
  locale: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
}
