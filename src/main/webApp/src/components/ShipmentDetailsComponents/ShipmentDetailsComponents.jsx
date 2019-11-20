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
  const [weight, setWeight] = useState('5k');
  const [enableCashOnD, setEnableCashOnD] = useState('COD')
  const [shipmentValue, setShipmentValue] = useState('')
  const [dropPick, setDropPick] = useState('DropOff')
  const [parcelSize, setParcelSize] = useState('Small')
  const handleChangeWeight = event => {
    setWeight(event.target.value)
  };  
  const handleChangeCOD = event => {
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
  const handleChangeParcelSize = event => {
    setParcelSize(event.target.value)
  }

  return (

      <PageContentComponent title={<FormattedMessage id='requestNewShipment' />}>  
      <form className={classes.container} noValidate autoComplete="off">
      <div>
      <FormGroupComponent>
      <FormControlComponent
                    label={<FormattedMessage id='fromCity' />}
                    fieldId='fromCity'
                    value={fromCity}
                    required                    
                    colSize={[2, 4]}

                    onChange={handleChangeFromCity}
                    // errorMessage={this.getError('phoneNumber')}
                >
                  <select>
                <option value="">Select City</option>
                {Cities.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                  ))}
                  </select>
                </FormControlComponent>
                <FormControlComponent
                    label={<FormattedMessage id='toCity' />}
                    fieldId='toCity'
                    value={toCity}
                    required
                    colSize={[2, 4]}
                    onChange={handleChangeToCity}
                    // errorMessage={this.getError('phoneNumber')}
                >
                  <select>
                <option value="">Select City</option>
                {Cities.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                  ))}
                  </select>
                </FormControlComponent>
            </FormGroupComponent>
            <FormGroupComponent>
      <FormControlComponent
          label={<FormattedMessage id='shipmentWight' />}
          value={weight}
          onChange={handleChangeWeight}
                    fieldId='weight'

                    required
                      colSize={[2, 4]}

                >
                  <select>
                <option value="">Select Weights</option>
                {weights.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                  ))}
                  </select>
                </FormControlComponent>
                <FormControlComponent
                    label={<FormattedMessage id='cashOnDelivery' />}
                    fieldId='enableCashOnD'
                    value={enableCashOnD}
                    required
                     colSize={[2, 4]}
                    onChange={handleChangeCOD}
                    // errorMessage={this.getError('phoneNumber')}
                >
                  <select>
                {enableCashOnDs.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                  ))}
                  </select>
                </FormControlComponent>
            </FormGroupComponent>
            <FormGroupComponent>
      <FormControlComponent
          label={<FormattedMessage id='shipmentValue' />}
          value={shipmentValue}
          onChange={handleChangeWeight}
                    fieldId='weight'

                    required
                     colSize={[2, 4]}

                >
            <input type="text" placeholder="SAR" maxLength="9" className="form-control"  />

                </FormControlComponent>
                <FormControlComponent
                    label={<FormattedMessage id='pickOrDrop' />}
                    fieldId='dropPick'
                    value={dropPick}
                    required
                     colSize={[2, 4]}
                    onChange={handleChangeDropPick}
                    // errorMessage={this.getError('phoneNumber')}
                >
                  <select>
                {dropPicks.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                  ))}
                  </select>
                </FormControlComponent>
            </FormGroupComponent>
            <FormGroupComponent>
                <FormControlComponent
                    label={<FormattedMessage id='shipmentSize' />}
                    fieldId='parcelSize'
                    value={parcelSize}
                    required
                     colSize={[2, 4]}
                    onChange={handleChangeParcelSize}
                    // errorMessage={this.getError('phoneNumber')}
                >
                  <select>
                {parcelSizes.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                  ))}
                  </select>
                </FormControlComponent>
            </FormGroupComponent>
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