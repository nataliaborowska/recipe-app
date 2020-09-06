import React from 'react';
import {Button, Form, Input} from 'antd';

import {IFormField} from '../ResetPassword';

interface IPropTypes {
  onFormFieldsChange: (changedFields: Array<IFormField>, allFields: Array<IFormField>) => void;
  onFormSubmit: (values: any) => void;
  onFormSubmitFailed: () => void;
  isFormValid: boolean;
}

export const ResetPasswordForm: React.FC<IPropTypes> = (props) => {
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
      data-test="component-reset-password-form"
      name="reset-password"
      onFinish={props.onFormSubmit}
      onFinishFailed={props.onFormSubmitFailed}
      onFieldsChange={props.onFormFieldsChange}
    >
      <Form.Item
        data-test="reset-password-email"
        label="Email"
        name="email"
        rules={[
          {
            required: true,
          },
          {
            type: 'email',
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          data-test="reset-password-submit"
          disabled={!props.isFormValid}
          type="primary"
          htmlType="submit"
        >
          Reset My Password
      </Button>
      </Form.Item>
    </Form>
  );
}
