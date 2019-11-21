import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import styles from './Export.css'

const ExportComponent = (props) => {
  let {type} = props
  return (
    <div>
      {type === 'all'?
        <div className={styles.container}>
          <a id="exportPDF" className={`  btn btn-primary ${styles.export} ${styles.pdf} `} onClick={() => props.onClick('pdf')} role="button">
            <i className="fa fa-file-pdf-o"></i> <span><FormattedMessage id='export' /> PDF</span> </a>
          <a id="exportExcel" className={`  btn btn-primary ${styles.export} ${styles.excel} `} onClick={() => props.onClick('xlsx')} role="button">
            <i className="fa fa-file-excel-o"></i> <span><FormattedMessage id='export' /> Excel</span> </a>
        </div>
        :type=== 'Excel'?
          <div className={styles.container}>
            <a id="exportExcel" className={`  btn btn-primary ${styles.export} ${styles.excel} `} onClick={() => props.onClick('xlsx')} role="button">
              <i className="fa fa-file-excel-o"></i> <span><FormattedMessage id='export' /> Excel</span> </a>
          </div>
        :null}
    </div>
  )
}

export default ExportComponent

ExportComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
}

