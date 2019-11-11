import React from 'react'
import StepZilla from "react-stepzilla"
import '../../assets/css/StepZilla.css'
import ParcelDetailsComponent from './ParcelDetailsComponent'
import ShippingRatesComponent from './ShippingRatesComponent'
import FromToAddressComponent from './FromToAddressComponent'
import ViewLabelComponent from './ViewLabelComponent'
import classnames from 'classnames'


const steps =
    [
      {name: 'Step 1', component: <ParcelDetailsComponent />},
      {name: 'Step 2', component: <ShippingRatesComponent />},
      {name: 'Step 3', component: <FromToAddressComponent />},
      {name: 'Step 4', component: <ViewLabelComponent />},
    ]

const OrderComponent = ()=> {
    return(
       <div className={classnames('step-progress', 'text-center')}>
            <StepZilla steps={steps} nextButtonCls={classnames('btn', 'btn-info')} backButtonCls={classnames('btn', 'btn-info')} prevBtnOnLastStep={false}/>
        </div>
    )
}

export default OrderComponent
