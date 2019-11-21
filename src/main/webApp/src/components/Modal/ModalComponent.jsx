import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Modal.css'

export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: this.props.showModal
    }
    this.dismissModal = this.dismissModal.bind(this)
  }

  showModal() {
    this.setState({...this.state, showModal: true})
  }

  dismissModal() {
    if(this.props.dismissable){
      this.setState({...this.state, showModal: false})

        this.props.onDestroy()

    }
  }

  componentWillReceiveProps(props) {
    this.setState({...this.state, showModal: props.showModal})
  }

  render() {
    const {noBorders} = this.props
    const className = classnames('permitModal', {
      'permitShowModal' : this.state.showModal
    })
    return(
      <div>
        <div id='permitModalDialogWin' className={className}>
          <div className={noBorders? 'permitModalContent noBorders': 'permitModalContent'}>
            <div className={noBorders ?'permitModalHeader noBorders': 'permitModalHeader'}>
              {this.props.dismissable ?
                <a id='anchorTag' className='permitCloseIcon'
                  onClick={(e) => {
                    e.preventDefault()
                    this.dismissModal()
                  }}>
                  <i className="fa fa-times"></i>
                </a>
              :
              null
            }
              <h3>{this.props.title}</h3>
            </div>
            <div className={noBorders ?'permitModalBody noBorders': 'permitModalBody'}>
              {this.props.children}
            </div>
          </div>
        </div>
        {/*TODO: Make the modal able to be un-dismissable when click outside*/}
        <div className={'permitModalOverlay'} onClick={this.dismissModal}></div>
      </div>
    )
  }
}

ModalComponent.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  showModal: PropTypes.bool.isRequired,
  onDestroy: PropTypes.func,
  dismissable : PropTypes.bool,
  noBorders: PropTypes.bool
}

ModalComponent.defaultProps = {
  dismissable: true,
  noBorders: false
}
