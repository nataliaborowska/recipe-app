import React from 'react';
import {Modal} from 'antd';
import {WarningOutlined} from '@ant-design/icons';

interface IPropTypes {
  message: string;
  isVisible: boolean;
  modalTitle: string;
  onCloseModal: () => void;
}

export const ErrorModal: React.FC<IPropTypes> = (props) => (
  <Modal
    onOk={props.onCloseModal}
    onCancel={props.onCloseModal}
    title={props.modalTitle}
    visible={props.isVisible}
  >
    <div data-test="component-error-modal">
      <p><WarningOutlined /> {props.message}</p>
    </div>

  </Modal>
)