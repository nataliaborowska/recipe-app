import React from 'react';
import {Button, Form, Input} from 'antd';

import {IFormField} from '../SignIn';

interface IPropTypes {
  onFormFieldsChange: (changedFields: Array<IFormField>, allFields: Array<IFormField>) => void;
  onFormSubmit: (values: any) => void;
  onFormSubmitFailed: () => void;
  isFormValid: boolean;
}

export const SignInForm: React.FC<IPropTypes> = (props) => {
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
      data-test="component-sign-in-form"
      name="sign-in"
      onFinish={props.onFormSubmit}
      onFinishFailed={props.onFormSubmitFailed}
      onFieldsChange={props.onFormFieldsChange}
    >
      <Form.Item
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

      <Form.Item
        label="Password"
        name="password"
        rules={[{required: true}]}
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
          Sign In
      </Button>
      </Form.Item>
    </Form>
  );
}
