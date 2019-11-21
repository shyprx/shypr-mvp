import React from 'react'
import './collapse.css'
import CheckboxButtonGroupComponent from '../CheckboxButton/CheckboxButtonGroupComponent'
import { AR } from '../../../constants/LocaleConstants'

const CollapseComponent = (data, onChange, showErrorMessage, errorMessage, locale) => (
  <div>
    <div className="error">
      {showErrorMessage
        ? errorMessage
        : null
      }
    </div>
    <ul className="collapse-list">
      {data.map((item, index) => (
        <li>
          <input className="collapse-open" type="checkbox" id={'collapse-' + index} />
          <label className="collapse-btn" htmlFor={'collapse-' + index}>{locale === AR ? item.nameAr : item.nameEn}</label>
          <div className="collapse-content">
            <CheckboxButtonGroupComponent
              checkboxItems={item.privileges}
              locale={locale}
              choiceId
              onChange={onChange}
            />
          </div>
        </li>
      ))}
    </ul>
  </div>
)

export default CollapseComponent
