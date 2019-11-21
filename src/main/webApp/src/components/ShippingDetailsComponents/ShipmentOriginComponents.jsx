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
  const [personName, setPersonName] = useState(null);
  const [description, setDescription] = useState(null);
  const [mobileNo, setMobileNo] = useState(null);
  const [email, setEmail] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [region, setRegion] = useState(null);
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const Order = useContext(OrderContext)
  const parcel = Order.order.parcel
console.log("Parcel:",parcel);
console.log("Order.order:",Order.order);
  const handleChangePersonName = event => {
    setPersonName(event.target.value)
  };

  const handleChangeDescription = event => {
    setDescription(event.target.value)
  };

  const handleChangeMobileNo = event => {
    setMobileNo(event.target.value)
  }; 
  
  const handleChangeEmail = event => {
    setEmail(event.target.value)
  }

  const handleChangeCityId = event => {
    setCityId(event.target.value)
  }

  const handleChangeRegion = event => {
    setRegion(event.target.value)
  }

  const handleChangeCity = event => {
    setCity(event.target.value)
  }

  const handleChangeDistrict = event => {
    setDistrict(event.target.value)
  }

  const handleChangeZipCode = event => {
    setZipCode(event.target.value)
  }

  const  mergeFields = () => {
    const fromAddressObj = {personName:personName,description:description,mobileNo:mobileNo,cityId:cityId}
    Order.setOrder({...Order.order,fromAddress:fromAddressObj})
  }

  return (
      <div>
        <Paper  className={classes.root}>
          <Typography className={classes.container} variant="h5" component="h3">
            <FormattedMessage id='shipmenntOrigin' />
          </Typography>
          <Typography component="p">
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
            value={personName}
            name='personName'
            onChange={handleChangePersonName}
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
            value={description}
            name='description'
            onChange={handleChangeDescription}
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
          value={region}
          name='region'
          onChange={handleChangeRegion}
        />
         <TextField 
          disabled
          id="outlined-basic"
          className={classes.textField}
          label={<FormattedMessage id="city" />}
          margin="normal"
          variant="outlined"
          value={city}
          name='city'
          onChange={handleChangeCity}
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
          value={district}
          name='district'
          onChange={handleChangeDistrict}
        />
         <TextField
          id="outlined-basic"
          className={classes.textField}
          label={<FormattedMessage id="zipCode" />}
          margin="normal"
          variant="outlined"
          value={zipCode}
          name='zipCode'
          onChange={handleChangeZipCode}
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
            value={mobileNo}
            name='mobileNo'
            onChange={handleChangeMobileNo}
          />
           <TextField
            id="outlined-basic"
            className={classes.textField} 
            label={<FormattedMessage id="email" />}
            margin="normal"
            variant="outlined"
            value={email}
            name='email'
            onChange={handleChangeEmail}
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
      <Button variant="contained" color="primary" className={classes.button} onClick={() => mergeFields()}>
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
 