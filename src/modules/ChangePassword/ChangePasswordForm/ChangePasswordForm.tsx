import React from 'react';
import {Button, Form, Input} from 'antd';

import {IFormField} from '../ChangePassword';

interface IPropTypes {
  onFormFieldsChange: (changedFields: Array<IFormField>, allFields: Array<IFormField>) => void;
  onFormSubmit: (values: any) => void;
  onFormSubmitFailed: () => void;
  isFormValid: boolean;
}

export const ChangePasswordForm: React.FC<IPropTypes> = (props) => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 8,
    },
  };

  return (
    <Form
      {...layout}
      name="change-password"
      onFinish={props.onFormSubmit}
      onFinishFailed={props.onFormSubmitFailed}
      onFieldsChange={props.onFormFieldsChange}
    >
      <Form.Item
        label="New password"
        name="passwordNew"
        rules={[{required: true}]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        dependencies={['passwordNew']}
        label="Confirm new password"
        name="confirm"
        rules={[
          {required: true},
          ({getFieldValue}) => ({
            validator(rule, value) {
              if (!value || getFieldValue('passwordNew') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          disabled={!props.isFormValid}
          type="primary"
          htmlType="submit"
        >
          Change My Password
      </Button>
      </Form.Item>
    </Form>
  );
}
