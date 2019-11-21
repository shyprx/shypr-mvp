import React, { Component } from 'react'
import moment from 'moment'
import { Trans } from 'react-i18next'
import {  isBlank , isValidDate } from '../../util/validators/ValidationUtil'
import errorConstants from '../../constants/ErrorConstants'
import FormGroupComponent from '../Form/FromGroupComponent'
import FormControlComponent from '../Form/FormControlComponent'
import '../Form/Button.css'
import '../Form/Label.css'
import TabComponent from '../Form/Tab/TabComponent'


export default class SearchListComponent extends Component { 

  constructor(props , sortCol , fieldsConfigs) {
    super(props)
    this.state = {
      errors: {},
      currentSortCol: sortCol ,
      currentSortDir: 'ASC',
      isBasicSearch: true,
      generalSearch: null,
      fields: {} ,
      fieldsConfigs : fieldsConfigs ,
    }
    this.onSearch = this.onSearch.bind(this)
  }

  onFieldChange = (id, value) => {
    const { fields } = this.state
    fields[id] = value
    this.setState(  {  fields  } )
  }

  onSearch() {
    const dateFormat = 'YYYY-MM-DD'
    const { fields, isBasicSearch , fieldsConfigs } = this.state
    let valid = true
    let searchOp = {} 
    const errors = {}
    if (!isBasicSearch) {      
      Object.keys(fieldsConfigs).forEach( key => {
        const fieldConfig = fieldsConfigs[key] ;
        const validators = fieldConfig.validators; 
        if(validators && validators.length > 0 ) {
          validators.forEach( validator => {
               if(validator.name == 'date' ) {
                  if(!isValidDate(fields[key] , dateFormat , moment))  {
                    valid = false
                    errors[key] = <Trans i18nKey={errorConstants.DATE_FORMAT} />
                  } 
               }
               else if(validator.name == 'dateLessThan' ) { 
                 const other  = validator.with ;
                 if (valid && fields[key] && fields[other] && fields[other] !== fields[key]) {
                  const start = moment(fields[other]).format(dateFormat)
                  const end = moment(fields[key]).format(dateFormat)
                  if (!moment(end).isAfter(start)) {
                    valid = false
                    errors[key] = <Trans i18nKey='endDateLessThanFromDate' />
                  }
                }             
               }  
          })
        }
      })
      Object.keys(fieldsConfigs).forEach( key => {
        if(!isBlank(fields[key])) searchOp[key] = fields[key] ;
      })
    } else {
      if(!isBlank(fields.generalSearch ) )  searchOp ={ generalSearch :  fields.generalSearch } ;
    } 
    this.setState({ errors })
    if (valid) {
      this.props.updateSearchFields(searchOp)
    }
  }

  getError(id) {
    if (id === 'fromDate' || id === 'toDate') {      
      return this.state.errors[id]
    }
    return null
  }

  renderBasicSearch(hint) {
    const { fields } = this.state
    return (
      <div className="tab-content mt-5">
        <div className="tab-pane active" id="normal" role="tabpanel" aria-labelledby="search-tab">
          <FormGroupComponent>
            <FormControlComponent
              label={<Trans i18nKey='searchFor' />}
              fieldId='generalSearch'
              value={fields.generalSearch}
              helpMessage={hint}
              onChange={this.onFieldChange}
              colSize={[2, 6]}
            >
              <input type='text' maxLength='35' />
            </FormControlComponent>
          </FormGroupComponent>
        </div>
      </div>
    )
  }

  renderTheGneralAndAdvanced = (hintKey, hideAdvance) => {
    const { isBasicSearch } = this.state
    const hint = <Trans i18nKey={hintKey} /> ;
    const tabs = hideAdvance === true ? [
      { id: 'basic', name: <Trans i18nKey='basicSearch' /> },
    ] : [
      { id: 'basic', name: <Trans i18nKey='basicSearch' /> },
      { id: 'advanced', name: <Trans i18nKey='advancedSearch' /> },
    ]
    return (
      <div>
        <TabComponent tabs={tabs} activeTab={isBasicSearch ? 'basic' : 'advanced'} onChange={() => this.setState({ isBasicSearch: !isBasicSearch })} />
        {
          isBasicSearch ? this.renderBasicSearch(hint) : this.renderAdvancedSearch()
        }
        <FormGroupComponent>
          <div className='col-md-2'>
            <button
              id='UserSearchButton'
              className='btn btn-primary'
              onClick={this.onSearch}
              type='button'
            >
              <Trans i18nKey='search' />
            </button>
          </div>
        </FormGroupComponent>
      </div>
    )
  }

}  
