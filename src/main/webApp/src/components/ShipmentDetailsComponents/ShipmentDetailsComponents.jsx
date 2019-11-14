import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { FormattedMessage } from 'react-intl';
import { Paper, Typography, Tabs, Tab, Button} from '@material-ui/core';

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
  const [fromCity, setFromCity] = React.useState('Riyadh');
  const [toCity, setToCity] = React.useState('Riyadh');
  const [weight, setWeight] = React.useState('5k');
  const [enableCashOnD, setEnableCashOnD] = React.useState('COD')
  const [dropPick, setDropPick] = React.useState('DropOff')

  const handleChangeWeight = event => {
    setWeight(event.target.value)
  };  const handleChangeCOD = event => {
    setEnableCashOnD(event.target.value)
  };
   const handleChangeFromCity = event => {
    setFromCity(event.target.value)
  };
  const handleChangeToCity = event => {
    setToCity(event.target.value)
  };
  const handleChangeDropPick = event => {
    setDropPick(event.target.value)
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
      <Button variant="contained" href="/to-destination" className={classes.button}>
        <FormattedMessage id="back" />
      </Button>
      <Button variant="contained" color="primary"  href="/from-destination"  className={classes.button}>
        <FormattedMessage id="next" />
      </Button>
    </div>
    </form>
    </Typography>
        </Paper>
    </div>
  );
}