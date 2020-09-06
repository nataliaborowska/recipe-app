import React from 'react';
import {Modal} from 'antd';
import {CheckOutlined} from '@ant-design/icons';

interface IPropTypes {
  message: string;
  isVisible: boolean;
  modalTitle: string;
  onCloseModal: () => void;
}

export const SuccessModal: React.FC<IPropTypes> = (props) => (
  <Modal
    onOk={props.onCloseModal}
    onCancel={props.onCloseModal}
    title={props.modalTitle}
    visible={props.isVisible}
  >
    <div data-test="component-success-modal">
      <p><CheckOutlined /> {props.message}</p>
    </div>
  </Modal>
)