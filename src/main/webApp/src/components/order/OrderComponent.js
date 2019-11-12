import React from 'react'
import StepZilla from "react-stepzilla"
import '../../assets/css/StepZilla.css'
import ParcelDetailsComponent from './ParcelDetailsComponent'
import ShippingRatesComponent from './ShippingRatesComponent'
import FromToAddressComponent from './FromToAddressComponent'
import ViewLabelComponent from './ViewLabelComponent'
import classnames from 'classnames'




const OrderComponent = ()=> {

   
    return(
        <div className="text-center">
            <ParcelDetailsComponent />
       </div>
    )
}

export default OrderComponent
