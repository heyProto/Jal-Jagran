import React from 'react';
import ReactModal from 'react-modal';

class Modal extends React.Component {

  constructor () {
    super();
    this.afterOpen = this.afterOpen.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  afterOpen() {
    if (this.props.iframeURL) {
      setTimeout((e) => {
        new ProtoEmbed.initFrame(document.getElementById('protograph_modal_card'), this.props.iframeURL, this.props.mode);
      }, 0);
    }
    document.body.style['overflow-y'] = 'hidden';
  }

  handleRequestClose() {
    document.body.style['overflow-y'] = 'auto';
  }

  render() {
    return(
      <ReactModal
        isOpen={this.props.showModal}
        onAfterOpen={this.afterOpen}
        closeTimeoutMS={0}
        overlayClassName="protograph-modal-overlay"
        className="proto-col col-7 protograph-modal"
        shouldFocusAfterRender={false}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        shouldReturnFocusAfterClose={true}
        role="dialog"
        parentSelector={() => document.body}
        aria={{
          labelledby: "heading",
          describedby: "full_description"
        }}
      >
        <div
          className="protograph-close-modal"
          onClick={((e) => {
            this.handleRequestClose(e);
            this.props.closeModal(e);
          })}
        >
          <div className="protograph-close-text">x</div>
        </div>
        <div id="protograph_modal_card"></div>
      </ReactModal>
    )
  }
}

export default Modal;