import React, { useState } from 'react';
import Navbar from './Navbar'
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom"
import OrderComponent from './components/order/OrderComponent'
import LoginComponent from './components/Login/loginComponent';
import AuthenticatedRoute from './components/authentication/AuthenticatedRoute';
import configureAxiosInterceptors from './components/authentication/AxiosConfig'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import LocaleProvider from './common/provider/LocaleProvider';
import OrderProvider from './common/provider/OrderProvider';
import { IntlProvider, addLocaleData } from "react-intl"
import messages_ar from './locale/ar.json'
import messages_en from './locale/en.json'
import locale_en from 'react-intl/locale-data/en';
import locale_ar from 'react-intl/locale-data/ar';
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import UserProvider from './common/provider/UserProvider';
import HomeComponent from './components/HomeComponent';
import { Switch } from 'react-router-dom';
import ShipmentDestinationComponents from './components/ShippingDetailsComponents/ShipmentDestinationComponents';
import ShipmentOriginComponents from './components/ShippingDetailsComponents/ShipmentOriginComponents';
import ShipmentDetailsComponents from './components/ShipmentDetailsComponents/ShipmentDetailsComponents';
import ShipmentRatesComponents from './components/order/ShippingRatesComponent';
import ViewRegistration from './components/Registration/ViewRegistrationComponent'
import SelfRegistrationComponent from './components/Registration/SelfRegistrationComponent'

import LayoutComponent from './components/LayoutComponent/LayoutComponent';
import RegistirationListComponent from './components/Registration/RegistirationListComponent';
import OrderSuccessfulComponent from './components/order/OrderSuccessfulComponent'



const messages = {
  'ar': messages_ar,
  'en': messages_en
}

const alertOptions = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
}

function App() {

  configureAxiosInterceptors()
  addLocaleData([...locale_en, ...locale_ar]);

  const initialLocale = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'ar'
  const initialDirection = initialLocale === 'ar' ? DIRECTIONS.RTL : DIRECTIONS.LTR
  const [locale, setLocale] = useState(initialLocale)
  const [direction, setDirection] = useState(initialDirection)

  const switchLanguage = (lang) => {
    setLocale(lang)
    switch (lang) {
      case 'ar':
        setDirection(DIRECTIONS.RTL)

        break
      case 'en':
        setDirection(DIRECTIONS.LTR)
        break
    }
  }

  return (
    <DirectionProvider direction={direction}>
      <LocaleProvider switchLanguage={switchLanguage}>
        <UserProvider>
          <IntlProvider locale={locale} messages={messages[locale]}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
              <Router>
                <LayoutComponent>
                  <Switch>
                    <Route path='/self-Registration' component={SelfRegistrationComponent} />
                    <Route path='/registration-list' component={RegistirationListComponent} />
                    <Route path='/ViewRegistration' component={ViewRegistration} />
                    {/* <Route path="/" exact component={HomeComponent} /> */}
                    {/* <Route path="/login" exact component={LoginComponent} className="center" /> */}
                    <Route path="/home" exact component={HomeComponent} />
                    <OrderProvider>
                      <AuthenticatedRoute path="/new-order/" component={OrderComponent} />
                      <Route path="/from-destination" exact component={ShipmentOriginComponents} />
                      <Route path="/to-destination" exact component={ShipmentDestinationComponents} />
                      <Route path="/shipment-rates" exact component={ShipmentRatesComponents} />
                      <Route path="/shipment-details" exact component={ShipmentDetailsComponents} />
                      <AuthenticatedRoute exact path="/order-successful" component={OrderSuccessfulComponent} />
                    </OrderProvider>
                  </Switch>
                </LayoutComponent>
              </Router>
            </AlertProvider>
          </IntlProvider>
        </UserProvider>
      </LocaleProvider>
    </DirectionProvider>
  );
}

export default App;
