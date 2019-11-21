import React from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'
import SubTitle from '../Subtitle/SubtitleComponent'
import StaticDataGroupComponent from '../../Form/StaticDataGroupComponent'
import './Filepicker.css'
import { AR } from '../../../constants/LocaleConstants'
import StaticAttachmentComponent from '../../Form/StaticAttachmentComponent'

export default class DisplayAttachments extends React.Component {
  renderAttachmentsData() {
    const { attachments, isAuthElm, isAuthContract } = this.props
    const title = <Trans i18nKey='attachments' />
    return (
      <div>
        <SubTitle title={title} />
        {attachments == null
          ? <Trans i18nKey='attachmentNotFound' />
          : (
            <StaticDataGroupComponent className='staticLabels'>
              {attachments.map((attachment, index) => (
                isAuthElm && attachment.attachmentConfig.attachmentTypeEn === 'Ownership' ? null : (
                  <StaticAttachmentComponent
                    id={index}
                    label={this.props.locale === AR
                      ? attachment.attachmentConfig.attachmentTypeAr
                      : attachment.attachmentConfig.attachmentTypeEn}
                    value={<Trans i18nKey='view' />}
                    colSize={[4, 2]}
                    hasLink={'/api/v1/file/' + attachment.requestID + '/' + attachment.attachmentType}
                  />
                )
              ))
              }
            </StaticDataGroupComponent>
          )}
      </div>
    )
  }

  renderAttachmentsDataForTemp() {
    const title = <Trans i18nKey='attachments' />
    const { attachments } = this.props
    return (
      <div>
        <SubTitle title={title} />
        <StaticDataGroupComponent className='staticLabels'>
          {attachments.map((attachment, i) => (
            <StaticAttachmentComponent
              id={i}
              label={<Trans i18nKey={attachment.attachmentType} />}
              value={<Trans i18nKey='view' />}
              colSize={[4, 2]}
              hasLink={'/api/v1/file/tmp/' + attachment.attachmentExt + '/' + attachment.attachmentSystemFileName}
            />
          ))
          }
        </StaticDataGroupComponent>
      </div>
    )
  }

  render() {
    return (
      this.props.isTemp ? this.renderAttachmentsDataForTemp() : this.renderAttachmentsData()
    )
  }
}
DisplayAttachments.propTypes = {
  attachments: PropTypes.array,
  // registerationNumber: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number,
  // ]),
  locale: PropTypes.string,
  isTemp: PropTypes.bool,
}
DisplayAttachments.defaultProps = {
  isTemp: false,
}
