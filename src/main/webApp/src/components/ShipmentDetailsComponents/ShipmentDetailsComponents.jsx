import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { FormattedMessage } from 'react-intl';
import { Paper, Typography, Tabs, Tab, Button} from '@material-ui/core';

const Cities = [
  {
    value: 'Riyadh',
    label: 'Riyadh'
  },
  {
    value: 'Jeddah',
    label: 'Jeddah',
  },
  {
    value: 'Dammam',
    label: 'Dammam',
  },
  {
    value: 'Qassim',
    label: 'Qassim',
  },
];
const weights = [
  {
    value: '5k',
    label: 'Less than 5Kg'
  },
  {
    value: '10k',
    label: 'Less than 10Kg'
  },
  {
    value: '15k',
    label: 'Less than 15Kg'
  },
  {
    value: '30k',
    label: 'Less than 30Kg'
  },
];
const duration = [
  {
    value: '1',
    label: 'Express Same Day'
  },
  {
    value: '2',
    label: 'Next Day'
  },
  {
    value: '3',
    label: '2-5 Day'
  },
  {
    value: '4',
    label: '6-9 Days'
  },
];
const enableCashOnDs = [
  {
    value: 'COD',
    label: 'Cash on Delivery'
  },
  {
    value: 'noCOD',
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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function ShipmentDetailsComponents() {
  const classes = useStyles();
  const [fromCity, setFromCity] = React.useState('Riyadh');
  const [toCity, setToCity] = React.useState('Riyadh');
  const [weight, setWeight] = React.useState('5k');
  const [enableCashOnD, setEnableCashOnD] = React.useState('COD')

  const handleChangeWeight = event => {
    setWeight(event.target.value)
    console.log(event.target.name);  
  };  const handleChangeCOD = event => {
    setEnableCashOnD(event.target.value)
    console.log(event.target.name);   
  };
   const handleChangeFromCity = event => {
    setFromCity(event.target.value)
    console.log(event.target.name);
  };
  const handleChangeToCity = event => {
    setToCity(event.target.value)
    console.log(event.target.name);
  };

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
          value={weight}
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
          margin="normal"
          variant="standard"
        />
      </div>
    </form>
    <form className={classes.container} noValidate autoComplete="off">
      <div>
      <Button variant="contained" className={classes.button}>
        <FormattedMessage id="back" />
      </Button>
      <Button variant="contained" color="primary"  href="/to-destination"  className={classes.button}>
        <FormattedMessage id="next" />
      </Button>
    </div>
    </form>
    </Typography>
        </Paper>
    </div>
  );
}