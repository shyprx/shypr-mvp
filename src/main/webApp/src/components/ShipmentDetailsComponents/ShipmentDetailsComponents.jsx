import React, {useState,useContext} from 'react';
import FileSaver from 'file-saver'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { FormattedMessage } from 'react-intl';
import { Paper, Typography, Tabs, Tab, Button } from '@material-ui/core';
import OrderContext from '../../common/context/OrderContext';

const Cities = [
  {
    value: '1',
    label: 'Riyadh'
  },
  {
    value: '2',
    label: 'Jeddah',
  },
  {
    value: '3',
    label: 'Dammam',
  },
];
const weights = [
  {
    value: 'KG_0_15',
    label: 'Less than 15Kg'
  },
  {
    value: 'KG_15_30',
    label: 'Less than 30Kg'
  },
];
const dropPicks = [
  {
    value: 'DropOff',
    label: 'Drop-Off'
  },
  {
    value: 'Pickup',
    label: 'Pickup'
  },
];
const enableCashOnDs = [
  {
    value: true,
    label: 'Cash on Delivery'
  },
  {
    value: false,
    label: 'no Cash on Delivery '
  },
];

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  root: {
    padding: theme.spacing(3, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  menu: {
    width: 200,
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function ShipmentDetailsComponents() {
  const classes = useStyles();
  const [fromCity, setFromCity] = useState('Riyadh');
  const [toCity, setToCity] = useState('Riyadh');
  const [weightCategory, setWeightCategory] = useState('5k');
  const [enableCashOnD, setEnableCashOnD] = useState('COD')
  const [dropPick, setDropPick] = useState('DropOff')
  const [parcelValue, setParcelValue] = useState(0)
  const Order = useContext(OrderContext)
  
  
  const handleChangeFromCity = event => {
    setFromCity(event.target.value)
  };

  const handleChangeToCity = event => {
    setToCity(event.target.value)
  };

  const handleChangeWeight = event => {
    setWeightCategory(event.target.value)
  }; 
  
  const handleChangeCOD = event => {
    setEnableCashOnD(event.target.value)
  };

  const handleChangeDropPick = event => {
    setDropPick(event.target.value)
  }

  const handleChangeParcelValue = event => {
    setParcelValue(event.target.value)
  };

  const doGenerateBarcode = (awbNumber) => {
    const headers = { 'Accept': 'application/pdf' }
    const params = { 'aWBId': awbNumber }
    //  document.getElementById('blockScreen').style.display = 'block';
    axios.get('/api/shipping-rates/print-barcode', { params, headers, responseType: 'arraybuffer' })
      .then(response => {
        const fileName = response.headers['content-disposition'].split(';')[1].split('=')[1];
        var blob = new Blob([response.data], { type: 'application/pdf' });
        FileSaver.saveAs(blob, fileName);
        //   document.getElementById('blockScreen').style.display = 'none';
      })
      .catch(error => {
        //     document.getElementById('blockScreen').style.display = 'none';
      })
  }
 const  mergeFields = () => {
   const packageDetailsObj = {fromCityId:fromCity,toCityId:toCity,weightCategory:weightCategory,cashOnDelivery:enableCashOnD,dropPick:dropPick,parcelValue:parcelValue}
   Order.setOrder({packageDetails:packageDetailsObj})
 }
  return (
    <div>
      <Paper className={classes.root}>
        <Typography className={classes.container} variant="h5" component="h3">
          <FormattedMessage id='shipmenntDetails' />
        </Typography>
        <Typography component="p">
          <form className={classes.container} noValidate autoComplete="off">
      <div>
      <TextField
          id="standard-select-currency"
          select
          label={<FormattedMessage id='fromCity' />}
          className={classes.textField}
          value={fromCity}
          name='fromCity'
          onChange={handleChangeFromCity}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="From"
          margin="normal"
        >
          {Cities.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select-currency"
          label={<FormattedMessage id='toCity' />}
          select
          className={classes.textField}
          value={toCity}
          onChange={handleChangeToCity}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="To"
          margin="normal"
        >
          {Cities.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </form>
    <form className={classes.container} noValidate autoComplete="off">
      <div>
      <TextField
          id="standard-select-currency"
          select
          label={<FormattedMessage id='shipmentWight' />}
          className={classes.textField}
          value={weightCategory}
          onChange={handleChangeWeight}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="From"
          margin="normal"
        >
          {weights.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select-currency"
          select
          label={<FormattedMessage id='cashOnDelivery' />}
          className={classes.textField}
          value={enableCashOnD}
          onChange={handleChangeCOD}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="From"
          margin="normal"
        >
          {enableCashOnDs.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </form>
    <form className={classes.container} noValidate autoComplete="off">
      <div>
      <TextField
          id="outlined-basic"
          className={classes.textField}
          label={<FormattedMessage id="shipmentValue" />}
          value={parcelValue}
          onChange={handleChangeParcelValue}
          margin="normal"
          variant="standard"
        />
         <TextField
          id="standard-select-currency"
          select
          label={<FormattedMessage id='cashOnDelivery' />}
          className={classes.textField}
          value={dropPick}
          onChange={handleChangeDropPick}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="From"
          margin="normal"
        >
          {dropPicks.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </form>
    <form className={classes.container} noValidate autoComplete="off">
      <div>
      <Link to='/self-Registration' style={{ margin: '0 auto' }}>
      <Button variant="contained" className={classes.button}>
        <FormattedMessage id="back" />
      </Button>
      </Link>
      <Link to='/shipment-rates' style={{ margin: '0 auto' }}>
      <Button variant="contained" color="primary" className={classes.button} onClick={() => mergeFields()}>
        <FormattedMessage id="next" />
      </Button>
      </Link>
    </div>
    </form>
    <button className={classes.button} onClick={() => doGenerateBarcode('123213')}>
                print
                  </button>
    </Typography>
        </Paper>
    </div>
  );
}