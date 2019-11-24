import React,{useContext} from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import OrderContext from '../../common/context/OrderContext';

const SuccessMessage = () =>{
const Order = useContext(OrderContext)
console.log("Final Order",Order);

   return (
<section>
  <div className="bg-white text-dark">
    <div className='Big-message my-5 text-center'>
      <i className='fa fa-check text-success' aria-hidden='true' />
      <h3 className='text-success'>
        {<FormattedMessage id="orderSavedSuccessfully"/>}
      </h3>
      <p>
        <FormattedMessage id='returnToPage' />
        <Link to={"/home"}>
          <a>
            {<FormattedMessage id="home"/>}
          </a>
       </Link>
      </p>
    </div>
    </div>
  </section>
   )
 }
 export default SuccessMessage