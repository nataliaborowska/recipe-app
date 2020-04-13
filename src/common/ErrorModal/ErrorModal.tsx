import React from 'react';
import {Modal} from 'antd';

interface IPropTypes {
  errorMessage: string;
  isVisible: boolean;
  modalTitle: string;
  onCloseErrorModal: () => void;
}

export const ErrorModal: React.FC<IPropTypes> = (props) => (
  <Modal
    onOk={props.onCloseErrorModal}
    onCancel={props.onCloseErrorModal}
    title={props.modalTitle}
    visible={props.isVisible}
  >
    <p>{props.errorMessage}</p>
  </Modal>
)