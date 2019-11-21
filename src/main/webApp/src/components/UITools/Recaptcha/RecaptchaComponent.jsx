import React from 'react'
import PropTypes from 'prop-types'
import Recaptcha from 'react-google-invisible-recaptcha'

const RECAPTCHA_SITE_KEY = '6Lf2QFUUAAAAAES8reCP-0Iaw-RDhF-M0eplJpl-'

export default class RecaptchaComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      style: { display: 'none' },
    }
    this.verifyCallback = this.verifyCallback.bind(this)
  }

  loadedSuccessfully() {
    //console.log('Loaded Successfully')
  }

  verifyCallback(response) {
    this.props.callAPI(response)
  }

  expiredCallback() {
    window.grecaptcha.reset()
  }

  render() {
    return (
      <Recaptcha
        sitekey={RECAPTCHA_SITE_KEY}
        onResolved={this.verifyCallback}
        locale={this.props.locale}
        onLoaded={this.loadedSuccessfully}
        style={this.state.style}
      />
    )
  }
}

RecaptchaComponent.propTypes = {
  locale: PropTypes.string.isRequired,
  callAPI: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
}
