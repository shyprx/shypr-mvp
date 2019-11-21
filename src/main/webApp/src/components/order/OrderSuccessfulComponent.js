import React from 'react'
import classnames from 'classnames'

const OrderSuccessfulComponent = (props) => {

    return (
        <div>
            <h3 class="text-success">Your order has been successful</h3>
            <button className={classnames("btn", "btn-primary")}>Print Label</button>
        </div>
    )
}

export default OrderSuccessfulComponent