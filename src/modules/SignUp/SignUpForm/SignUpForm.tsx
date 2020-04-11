import React from 'react';
import {Button, Form, Input, Typography} from 'antd';

import modules from './SignUp.module.scss';

interface IPropTypes {
  onFormSubmit: (values: any) => void;
  onFormSubmitFailed: (error: any) => void;
}

export const SignUpForm: React.FC<IPropTypes> = (props) => {
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
      name="sign-up"
      onFinish={props.onFormSubmit}
      onFinishFailed={props.onFormSubmitFailed}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{required: true}]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Username"
        name="userName"
        rules={[{required: true}]}
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

      <Form.Item
        dependencies={['password']}
        label="Confirm password"
        name="confirm"
        rules={[
          {required: true},
          ({getFieldValue}) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
