import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { FormattedMessage } from 'react-intl';
import { Paper, Typography, Tabs, Tab} from '@material-ui/core';

const currencies = [
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
  {
    value: '4',
    label: 'Qassim',
  },
];
const weight = [
  {
    value: '1',
    label: 'Less than 5Kg'
  },
  {
    value: '2',
    label: 'Less than 10Kg'
  },
  {
    value: '3',
    label: 'Less than 15Kg'
  },
  {
    value: '4',
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
const enableCashOnD = [
  {
    value: '1',
    label: 'Cash on Delivery'
  },
  {
    value: '2',
    label: 'no Cash on Delivery '
  },
];

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  menu: {
    width: 200,
  },
}));

export default function ShipmentDetailsComponents() {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = event => {
    setCurrency(event.target.value);
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
          value={currency}
          onChange={handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="From"
          margin="normal"
        >
          {currencies.map(option => (
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
          value={currency}
          onChange={handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="To"
          margin="normal"
        >
          {currencies.map(option => (
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
          value={currency}
          onChange={handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="From"
          margin="normal"
        >
          {weight.map(option => (
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
          value={currency}
          onChange={handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="From"
          margin="normal"
        >
          {enableCashOnD.map(option => (
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
          label={<FormattedMessage id='shippingDuration' />}
          className={classes.textField}
          value={currency}
          onChange={handleChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="From"
          margin="normal"
        >
          {duration.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </form>
    </Typography>
        </Paper>
    </div>
  );
}