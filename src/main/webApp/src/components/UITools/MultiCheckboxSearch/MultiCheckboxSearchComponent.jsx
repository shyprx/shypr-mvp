import React from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'
import CheckboxButtonGroupComponent from '../CheckboxButton/CheckboxButtonGroupComponent'
import './CheckboxSearchStyle.css'
import '../../Form/FormControl.css'
import { AR } from '../../../constants/LocaleConstants'

export default class MultiCheckboxSearchComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: this.props.getItems,
      selectAll: [{
        id: 'all',
        nameAr: <Trans i18nKey="selectAll" />,
        nameEn: <Trans i18nKey="selectAll" />,
        checked: false,
        show: true,
      }],
    }
    this.filterText = ''
    this.searchItems = this.searchItems.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleSelectAll = this.handleSelectAll.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({ items: newProps.getItems, selectAll: newProps.selectAllVals })
  }

  searchItems(event) {
    if (true) {
      const searchedItems = this.state.items
      this.filterText = event.target.value
      let count = 0
      searchedItems.forEach((item) => {
        const x = this.props.locale === AR
                ? item.nameAr.toUpperCase().indexOf(this.filterText.toUpperCase())
                : item.nameEn.toUpperCase().indexOf(this.filterText.toUpperCase())
        // let name = this.props.locale === AR ? item.nameAr : item.nameEn
        if (this.filterText.trim() === '') {
          searchedItems[count].show = true
        } else if (x !== -1) {
          searchedItems[count].show = true
        } else{ searchedItems[count].show = false }
        count++
      })
      this.setState({ items: searchedItems })
    }
  }

  handleTypeChange(event) {
    const { items, selectAll } = this.state
    selectAll[0].checked = true
    for (let i in items) {
      if (items[i].id == event.target.value) {
        items[i].checked = !items[i].checked
      }
      if (items[i].show) {
        if (items[i].checked === false) {
          if (this.props.viewStatus !== 'view') {
            selectAll[0].checked = false
          }
        }
      }
    }
    if (this.props.viewStatus !== 'view') {
      this.setState({ items, selectAll })
      if (this.props.handleListUpdate) {
        const onlyChecked = []
        for (let it in items) {
          if (items[it].checked === true) {
            onlyChecked.push(items[it])
          }
        }
        this.props.handleListUpdate(onlyChecked)
      }
    }else {
      this.setState({ items })
 }
  }

  handleSelectAll(event) {
    if (this.props.viewStatus !== 'view') {
      const { items } = this.state
      for (let i in items) {
        if (items[i].show) {
          items[i].checked = event.target.checked
        }
      }
      const x = this.state.selectAll
      x[0].checked = event.target.checked
      this.setState({ items, selectAll: x })
      if (this.props.handleListUpdate) {
        this.props.handleListUpdate(items)
      }
    }
  }

  render() {
    const {
      showErrorMessage, errorMessage, search4, viewStatus,
    } = this.props
    let validationMessage = null
    if (showErrorMessage) {
      validationMessage = (
        <span className='error' style={{ marginRight: 20, marginBottom: 10 }}>
          { showErrorMessage
            ? errorMessage : null
          }
        </span>)
    }
    if (viewStatus === 'view') {
      return (
        <React.Fragment>
          {/* <label className="col-md-2 col-form-label"><Trans i18nKey={ search4 }/></label>  */}
          <div className='checkboxContainer bg-light'>
            {/*  <div className={'checkboxContainer'}>
              <div className={'checkboxSearch'}>
                <Trans  i18nKey={this.props.search4}>
                   {(message) => <input id='searchItems'  type='text' className={'form_control'}
                                  value={this.filterText}
                                  onChange={this.searchItems}
                                  placeholder={message}/>
                  }
                </Trans>
              </div> */}
            <div className='scroll scroller'>
              <CheckboxButtonGroupComponent
                checkboxItems={this.state.items}
                locale={this.props.locale}
                withNumber={this.props.withNumber}/>
            </div>
            {/* </div> */}
          </div>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        {/* <label className="col-md-2 col-form-label">{search4}</label> */}
        {/* <div className='col-md-10 col-sm-12'> */}
          <div className='checkboxContainer'>
            { /* <div className={'checkboxSearch'}> */}
            { /* <Trans  i18nKey={this.props.search4}>
            {(message) => <input id='searchItems' type='text' className={'form_control'}
                                        onChange={this.searchItems}
                                        placeholder={message}/>
                  }
                </Trans>
              </div>  */}
            <div className='scroll scroller'>
              <CheckboxButtonGroupComponent
                checkboxItems={this.state.items}
                onChange={this.handleTypeChange}
                locale={this.props.locale}
                withNumber={this.props.withNumber}
                handleLinkClick={this.props.handleLink}/>
            </div>
            {/* <div className={'checkboxSelectAll'}>
                <div className={'scroll'}>
                  <CheckboxButtonGroupComponent
                    checkboxItems={this.state.selectAll}
                    onChange={this.handleSelectAll}
                    locale={this.props.locale}/>
                </div>
              </div> */}
          </div>
          {validationMessage}
        {/* </div> */}
      </React.Fragment>
    )
  }
}

MultiCheckboxSearchComponent.propTypes = {
  getItems: PropTypes.array.isRequired,
  selectAllVals: PropTypes.array,
  locale: PropTypes.string.isRequired,
  errorMessage: PropTypes.object,
  showErrorMessage: PropTypes.bool,
  viewStatus: PropTypes.string.isRequired,
  search4: PropTypes.object,
  handleListUpdate: PropTypes.func,
  handleLink: PropTypes.func,
}
MultiCheckboxSearchComponent.defaultProps = {
  //search4: 'search4item',
  withNumber: false,
}
