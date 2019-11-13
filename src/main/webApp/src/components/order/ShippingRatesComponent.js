import React, {useState} from 'react';
import {FormattedMessage} from 'react-intl'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/LocalShipping';
import ARAMEX from './../../assets/images/aramex.svg'
import SMSA from './../../assets/images/smsa-express.svg'
import DHL from './../../assets/images/DHL_Logo.png'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  title:{
    overflow: 'hidden',
    fontSize: '1.2rem',
    lineHeight: '24px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  subtitle: {
    overflow: 'hidden',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  titleFont:{
    fontSize:'x-large'
  },
}));

const tileData = [
{img: ARAMEX,title: 'ARAMEX',price: '34',date: '10-12-2019',day:<FormattedMessage id='SATURDAY'/>},
{img: DHL,title: 'DHL',price: '54',date: '22-1-2019',day:<FormattedMessage id='SUNDAY'/>},
{img: SMSA,title: 'SMSA',price: '39',date: '21-11-2019',day:<FormattedMessage id='MONADY'/>},
{img: ARAMEX,title: 'ARAMEX',price: '24',date: '21-12-2019',day:<FormattedMessage id='TUESDAY'/>},
{img: DHL,title: 'DHL',price: '55',date: '19-11-2019',day:<FormattedMessage id='WEDNESDAY'/>},
{img: SMSA,title: 'SMSA',price: '44',date: '29-11-2019',day:<FormattedMessage id='THURSDAY'/>},
{img: SMSA,title: 'SMSA',price: '25',date: '21-12-2019',day:<FormattedMessage id='FRIDAY'/>},
{img: ARAMEX,title: 'ARAMEX',price: '24',date: '16-12-2019',day:<FormattedMessage id='SATURDAY'/>}];


const ShippingRatesComponent = ()=> {
    const classes = useStyles();
    const sortedData = tileData.sort((a,b) => a.price < b.price)
    const [company,setCompany] = useState(null)

    const handleSelectRate = (rate) => {
        setCompany(rate);
        this.props.selectedCompany()
    }
    console.log("company",company);
    
    return (
      <div className={classes.root}>
        <GridList cellHeight={200} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div" className={classes.titleFont}><b>Rates</b></ListSubheader>
          </GridListTile>
          {tileData.map(tile => (
            <GridListTile key={tile.img}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={<span>{tile.price} <FormattedMessage id='SAR'/></span>}
                subtitle={<span className ={classes.subtitle}><FormattedMessage id='deliveryOn'/>{tile.day} <br/>{tile.date}</span>}
                actionIcon={
                    <button className={classes.icon} onClick={() => handleSelectRate(tile)}>
                        <InfoIcon />
                    </button>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
}

export default ShippingRatesComponent
