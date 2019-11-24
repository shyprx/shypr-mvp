import React from 'react'
import classnames from 'classnames'
import axios from 'axios'

const OrderSuccessfulComponent = (props) => {

    const printLabel = () => {
        axios.get("/api/shipping-labels/print")
    }

    return (
        <div>
            <h3 class="text-success">Your order has been successful</h3>
            <button className={classnames("btn", "btn-primary")}
                onClick={printLabel}>Print Label</button>
        </div>
    )
}

export default OrderSuccessfulComponent