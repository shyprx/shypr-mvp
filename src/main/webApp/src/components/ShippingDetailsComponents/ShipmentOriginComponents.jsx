import React, {useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormattedMessage } from 'react-intl';
import { Paper, Typography, Tabs, Tab, FormGroup, FormControlLabel, Switch, FormControl} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import OrderContext from '../../common/context/OrderContext';

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
  textFieldBig: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 415,
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

export default function ShipmentOriginComponents(props) {
  const classes = useStyles();
  const [value, setValue] = useState(2);
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });
  const Order = useContext(OrderContext)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
console.log("Order",Order);

  return (
      <div>
        <Paper  className={classes.root}>
          <Typography className={classes.container} variant="h5" component="h3">
            <FormattedMessage id='shipmenntOrigin' />
          </Typography>
          <Typography component="p">
          {/* <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label={<FormattedMessage id='shipmenntOrigin' />} onClick="/from-destination"/>
            <Tab label="Active" />
            <Tab label={<FormattedMessage id='shipmenntDestination' />} onClick="/to-destination" />
          </Tabs> */}
          
           <form className={classes.container} noValidate autoComplete="on">
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="start"
                    control={<Switch color="primary" />}
                    label={<FormattedMessage id="useDefaultOrigin" />}
                    labelPlacement="start"
                  />
                </FormGroup>
              </FormControl>
              </form>
          <form className={classes.container} noValidate autoComplete="on">
        <div>
            <React.Fragment>
            <TextField
            id="outlined-basic"
            className={classes.textFieldBig}
            label={<FormattedMessage id="fullName" />}
            margin="normal"
            variant="outlined"
            />
            </React.Fragment>
        </div>
        </form>
        <form className={classes.container} noValidate autoComplete="off">
        <div>
            <React.Fragment>
            <TextField
            id="outlined-basic"
            className={classes.textFieldBig}
            label={<FormattedMessage id="pickupAddress" />}
            margin="normal"
            variant="outlined"
            />
            </React.Fragment>
        </div>
        </form>
    <form className={classes.container} noValidate autoComplete="off">
      <div>
        <React.Fragment>
        <TextField
          disabled
          id="outlined-basic"
          className={classes.textField}
          label={<FormattedMessage id="region" />}
          margin="normal"
          variant="outlined"
        />
         <TextField 
          disabled
          id="outlined-basic"
          className={classes.textField}
          label={<FormattedMessage id="city" />}
          margin="normal"
          variant="outlined"
        />
        </React.Fragment>
      </div>
    </form>
    <form className={classes.container} noValidate autoComplete="off">
      <div>
        <React.Fragment>
        <TextField
          id="outlined-basic"
          className={classes.textField}
          label={<FormattedMessage id="district" />}
          margin="normal"
          variant="outlined"
        />
         <TextField
          id="outlined-basic"
          className={classes.textField}
          label={<FormattedMessage id="zipCode" />}
          margin="normal"
          variant="outlined"
        />
        </React.Fragment>
      </div>
    </form>
        <form className={classes.container} noValidate autoComplete="off">
        <div>
          <React.Fragment>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label={<FormattedMessage id="phone" />}
            margin="normal"
            variant="outlined"
          />
           <TextField
            id="outlined-basic"
            className={classes.textField} 
            label={<FormattedMessage id="email" />}
            margin="normal"
            variant="outlined"
          />
          </React.Fragment>
        </div>
      </form>
      <form className={classes.container} noValidate autoComplete="off">
      <div>
      <Link to='/shipment-rates' style={{ margin: '0 auto' }}>
      <Button variant="contained" href="/shipment-rates" className={classes.button}>
        <FormattedMessage id="back" />
      </Button>
      </Link>
      <Link to='/to-destination' style={{ margin: '0 auto' }}>
      <Button variant="contained" color="primary"  href="/to-destination"  className={classes.button}>
        <FormattedMessage id="next" />
      </Button>
      </Link>
    </div>
    </form>
          </Typography>
        </Paper>
      </div>
  );
}
 