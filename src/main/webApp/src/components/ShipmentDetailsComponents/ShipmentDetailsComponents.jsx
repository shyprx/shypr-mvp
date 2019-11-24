/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
import React ,{useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom'
import { Paper, Typography, Tabs, Tab, Button} from '@material-ui/core';
import PageContentComponent from '../PageContent/PageContentComponent'
// import LocationContainer from '../../../containers/LocationContainer';
import FormGroupComponent from '../Form/FromGroupComponent';
import FormControlComponent from '../Form/FormControlComponent';
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
const parcelSizes = [
  {
    value: 'Small',
    label: 'small'
  },
  {
    value: 'Medium',
    label: 'Medium'
  },
  {
    value: 'Large',
    label: 'Large'
  },
];
const enableCashOnDs = [
  {
    value: '1',
    label: 'Cash on Delivery'
  },
  {
    value: '0',
    label: 'no Cash on Delivery '
  },
];

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
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
  const [parcelValue, setParcelValue] = useState('')
  const [dropPick, setDropPick] = useState('DropOff')
  // const [parcelSize, setParcelSize] = useState('Small')


  const handleChangeWeight = event => {
    setWeightCategory(weightCategory)
  };  
  const handleChangeCOD = event => {
    setEnableCashOnD(enableCashOnD)
  };
   const handleChangeFromCity = event => {
    setFromCity(fromCity)
  };
  const handleChangeToCity = event => {
    setToCity(toCity)
  };
  const handleChangeDropPick = event => {
    setDropPick(dropPick)
  }
  const handleChangeParcelValue = event => {
    setParcelValue(parcelValue)
  }

  return (


      <PageContentComponent title={<FormattedMessage id='requestNewShipment' />}>  
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
        <tr/>
      <Link to='/shipment-rates' style={{ margin: '0 auto' }}>
          <button className="btn btn-primary" type='submit'>
          <FormattedMessage id="next" />
          </button>
      </Link>
    </div>
    </form>
  </PageContentComponent>

  );
}