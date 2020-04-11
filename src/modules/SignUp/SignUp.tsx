import React from 'react';
import {Button, Form, Typography} from 'antd';

import modules from './SignUp.module.scss';

export const SignUp: React.FC = () => {
  const onFormSubmit = () => {

  }

  const onFormSubmitFailed = () => {

  }

  return (
    <div className={modules.signUp}>
      <Typography>Sign Up</Typography>

      <Form
        name="sign-up"
        onFinish={onFormSubmit}
        onFinishFailed={onFormSubmitFailed}
      >
        <Form.Item>

        </Form.Item>
        <Form.Item></Form.Item>
        <Form.Item></Form.Item>
      </Form>
    </div>
  );
}
