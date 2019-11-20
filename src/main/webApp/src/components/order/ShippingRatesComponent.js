import React, {useState,useEffect,useContext} from 'react';
import {FormattedMessage} from 'react-intl'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ShyprLogo from './../../assets/images/logoWithName.png'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { WeightCategory, PaymentType, DeliveryTime } from './../../common/enums'
import OrderContext from '../../common/context/OrderContext';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  gridList: {
    //width: 500,
    height: 900,
  },
  icon: {
    marginLeft: '20px',
  },
  title:{
    overflow: 'initial',
    fontSize: '1.9rem',
    lineHeight: '28px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    margin: '1% 0 0 68%',
    
  },
  subtitle: {
    overflow: 'hidden',
    fontSize: '1.3rem',
    lineHeight: '1.5',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    margin: '0 0 0 28%',
    fontFamily:'unset'
  },
  titleFont:{
    fontSize:'x-large',
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const ShippingRatesComponent = (props)=> {
    const classes = useStyles();
    const [rates,setRates] = useState([]);
    const Order = useContext(OrderContext)
    const packageDetails = Order.order.packageDetails
    console.log("packageDetails",packageDetails);
    
    
    useEffect(() => {
      getAllRates()
  }, [])

  const getAllRates = () => {
    axios.get('/api/shipping-rates/parcel-details', {params:{
      fromCityId:packageDetails.fromCityId,
      toCityId:packageDetails.toCityId,
      weightCategory:packageDetails.weightCategory,
      cashOnDelivery:packageDetails.cashOnDelivery,
      parcelValue:packageDetails.parcelValue}})
    .then(response => {
      setRates(response.data)
    }).catch((error) =>{
      console.log("Cannot fetch shipping rates!");
      
    })
}

    const handleSelectRate = (rate) => {
      const quoteDetails = {id:rate.id};
      Order.setOrder({quoteDetails:quoteDetails});
      // <Link to='/shipment-details' style={{ margin: '0 auto' }}/>
      //props.history.push("/")
    }

    return (
      <div>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          </GridListTile>
          {rates.map(rate => (
            <GridListTile key={ShyprLogo}>
              <img src={ShyprLogo} />
              <GridListTileBar 
                title={<p className={classes.title}>{rate.price} <FormattedMessage id='SAR'/></p>}
                subtitle={<p className ={classes.subtitle}><FormattedMessage id='deliveryOn'/>{<FormattedMessage id={rate.deliveryTime}/>}</p>}
                actionIcon={
                    <button className={`btn btn-outline-light ${classes.icon}`} type='submit' onClick={() => handleSelectRate(rate.id)}>
                       <FormattedMessage id='shipNow'/>
                    </button>
                }
              />
            </GridListTile>
          ))}
        </GridList>
            <form className={classes.container} noValidate autoComplete="off">
            <div>
            <Link to='/shipment-details' style={{ margin: '0 auto' }}>
            <Button variant="contained" className={classes.button}>
              <FormattedMessage id="back" />
            </Button>
            </Link>
          </div>
          </form>
      </div>
    );
}

export default withRouter(ShippingRatesComponent)