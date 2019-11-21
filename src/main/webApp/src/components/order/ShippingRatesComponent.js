import React, {useState} from 'react';
import {FormattedMessage} from 'react-intl'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/LocalShipping';
import ARAMEX from './../../assets/images/aramex.svg'
import SMSA from './../../assets/images/smsa-express.svg'
import DHL from './../../assets/images/DHL_Logo.png'
import { withRouter } from 'react-router-dom';
import PageContentComponent from '../PageContent/PageContentComponent'

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

const tileData = [
{img: ARAMEX,title: 'ARAMEX',price: '34',date: '10-12-2019',day:<FormattedMessage id='SATURDAY'/>},
{img: DHL,title: 'DHL',price: '54',date: '22-1-2019',day:<FormattedMessage id='SUNDAY'/>},
{img: SMSA,title: 'SMSA',price: '39',date: '21-11-2019',day:<FormattedMessage id='MONDAY'/>},
{img: ARAMEX,title: 'ARAMEX',price: '24',date: '21-12-2019',day:<FormattedMessage id='TUESDAY'/>},
{img: DHL,title: 'DHL',price: '55',date: '19-11-2019',day:<FormattedMessage id='WEDNESDAY'/>},
{img: SMSA,title: 'SMSA',price: '44',date: '29-11-2019',day:<FormattedMessage id='THURSDAY'/>},
{img: SMSA,title: 'SMSA',price: '25',date: '21-12-2019',day:<FormattedMessage id='FRIDAY'/>},
{img: ARAMEX,title: 'ARAMEX',price: '24',date: '16-12-2019',day:<FormattedMessage id='SATURDAY'/>}];


const ShippingRatesComponent = (props)=> {
    const classes = useStyles();
    const sortedData = tileData.sort((a,b) => a.price < b.price)
    const [company,setCompany] = useState(null)

    const handleSelectRate = (rate) => {
        setCompany(rate);
        props.history.push("/from-destination");
    }

    return (
      <PageContentComponent title={<FormattedMessage id='shippingCompanies' />}> 
        <GridList cellHeight={200} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          </GridListTile>
          {tileData.map(tile => (
            <GridListTile key={tile.img}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar 
                title={<p className={classes.title}>{tile.price} <FormattedMessage id='SAR'/></p>}
                subtitle={<span className ={classes.subtitle}><FormattedMessage id='deliveryOn'/>{tile.day} <br/>{tile.date}</span>}
                actionIcon={
                    <button className={`btn btn-outline-light ${classes.icon}`} type='submit' onClick={() => handleSelectRate(tile)}>
                       <FormattedMessage id='shipNow'/>
                    </button>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        </PageContentComponent>
    );
}

export default withRouter(ShippingRatesComponent)
