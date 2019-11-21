import React, { useState } from 'react'
import OrderContext from '../context/OrderContext'

const OrderProvider = (props) => {

    const [order, setOrder] = useState({
        parcel: {},
        fromAddress: {},
        toAddress: {},
        shippingRate: {},
        labelDetails: {},
    })

    return (
        <OrderContext.Provider
            value={{order: order, setOrder: setOrder}}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderProvider