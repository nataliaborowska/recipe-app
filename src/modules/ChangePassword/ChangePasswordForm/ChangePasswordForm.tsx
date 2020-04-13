import React from 'react';
import {Button, Form, Input} from 'antd';

interface IPropTypes {
  onFormFieldsChange: (changedFields: any, allFields: any) => void;
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
        label="Current password"
        name="passwordCurrent"
        rules={[{required: true}]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="New password"
        name="passwordNew"
        rules={[{required: true}]}
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
