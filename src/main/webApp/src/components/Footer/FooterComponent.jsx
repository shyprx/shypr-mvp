import React from 'react'
import './Footer.css'
// import '../../assets/css/bootstrap-ar.min.css'
import { FormattedMessage } from 'react-intl'



export default class HeaderComponent extends React.Component {
    render(){const FooterComponent = () => (
        <footer className='footer'>
            <div className="container">
                <div className="fl-group">
                    <a className="footer-link" href="/Home"><FormattedMessage id='privacyStatement'/></a>
                    <a className="footer-link" href="/Home"><FormattedMessage id='technicalSupport'/></a>
                    <a className="footer-link" href="/Home"><FormattedMessage id='callUs'/></a>
                </div>
                <div className="footer-text"><FormattedMessage id='copyright'/></div>
            </div>
        </footer>
    )

    return(
        <div><FooterComponent/></div>
    )
    }
}
