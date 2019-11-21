import React, {useState,useEffect,useContext} from 'react';
import {FormattedMessage} from 'react-intl'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/LocalShipping';
import ShyprLogo from './../../assets/images/logoWithName.png'
import { withRouter } from 'react-router-dom';
import PageContentComponent from '../PageContent/PageContentComponent'
import axios from 'axios';
import { Button } from '@material-ui/core';
import { WeightCategory, PaymentType, DeliveryTime } from './../../common/enums'
import OrderContext from '../../common/context/OrderContext';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  test:{
    margin: '-11% 52% 12% 0',
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
    lineHeight: '24px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    margin: '17% 5% 0 0',
    
  },
  subtitle: {
    overflow: 'hidden',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    margin: '0 45% 8% 0',
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
  const parcel = Order.order.parcel
  console.log("packageDetails",parcel);
  
  
  useEffect(() => {
    getAllRates()
}, [])

const getAllRates = () => {
  axios.get('/api/shipping-rates/parcel-details', {params:{
    fromCityId:parcel.fromCityId,
    toCityId:parcel.toCityId,
    weightCategory:parcel.weightCategory,
    cashOnDelivery:parcel.cashOnDelivery,
    parcelValue:parcel.parcelValue}})
  .then(response => {
    setRates(response.data)
  }).catch((error) =>{
    console.log("Cannot fetch shipping rates!");
    
  })
}

const handleSelectRate = (rate) => {
        Order.setOrder({...Order.order,shippingRate:{id:rate}});
      }

    return (
      <PageContentComponent title={<FormattedMessage id='shippingCompanies' />}> 
        <GridList cellHeight={200} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          </GridListTile>
        {rates.map(rate => (
          <GridListTile key={ShyprLogo}>
            <img src={ShyprLogo} />
            <GridListTileBar 
              title={<p className={classes.title}>{rate.price} <FormattedMessage id='SAR'/></p>}
              subtitle={<p className ={classes.subtitle}><FormattedMessage id='deliveryOn'/>{<FormattedMessage id={rate.deliveryTime}/>}</p>}
              actionIcon={
                    <Link to='/from-destination' style={{ margin: '0 auto' }}>
                        <button className={`btn btn-outline-light ${classes.icon}`} type='submit' onClick={() => handleSelectRate(rate.id)}>
                          <FormattedMessage id='shipNow'/>
                        </button>
                    </Link>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        </PageContentComponent>
    );
}

export default withRouter(ShippingRatesComponent)
