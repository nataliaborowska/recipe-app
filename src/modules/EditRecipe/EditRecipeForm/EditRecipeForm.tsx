import React from 'react';
import {Form, Button, Input, InputNumber} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';

import {IFormField} from '../EditRecipe';

interface IPropTypes {
  isFormValid: boolean;
  onFormSubmit: (values: any) => void;
  onFormSubmitFailed: () => void;
  onFormFieldsChange: (changedFields: Array<IFormField>, allFields: Array<IFormField>) => void;
}

export const EditRecipeForm: React.FC<IPropTypes> = (props) => {
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
      name="edit-recipe"
      onFinish={props.onFormSubmit}
      onFinishFailed={props.onFormSubmitFailed}
      onFieldsChange={props.onFormFieldsChange}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{required: true}]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{required: true}]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Servings"
        name="servings"
        rules={[{
          required: true,
          type: 'number',
          min: 0,
        }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Calories"
        name="calories"
        rules={[{
          required: true,
          type: 'number',
          min: 0,
        }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Preparation time (minutes)"
        name="preparationTime"
        rules={[{
          required: true,
          type: 'number',
          min: 0,
        }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.List name="ingredients">
        {
          (fields, {add, remove}) => (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...index === 0 ? tailLayout.wrapperCol : tailLayout}
                  key={field.key}
                  label={index === 0 ? 'Ingredients' : ''}
                  rules={[{required: index === 0 ? true : false}]}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please write dish ingredient.",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="ingredient" style={{width: fields.length > 1 ? '85%' : '100%'}} />
                  </Form.Item>

                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      style={{margin: '0 8px'}}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}

              <Form.Item {...tailLayout}>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                >
                  <PlusOutlined /> Add ingredient
                </Button>
              </Form.Item>
            </div>
          )
        }
      </Form.List>

      <Form.List name="instructions">
        {
          (fields, {add, remove}) => (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...index === 0 ? tailLayout.wrapperCol : tailLayout}
                  key={field.key}
                  label={index === 0 ? 'Instructions' : ''}
                  rules={[{required: index === 0 ? true : false}]}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please write preparation step.",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="preparation step" style={{width: fields.length > 1 ? '85%' : '100%'}} />
                  </Form.Item>

                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      style={{margin: '0 8px'}}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}

              <Form.Item {...tailLayout}>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                >
                  <PlusOutlined /> Add preparation step
                </Button>
              </Form.Item>
            </div>
          )
        }
      </Form.List>

      <Form.Item {...tailLayout}>
        <Button
          disabled={!props.isFormValid}
          type="primary"
          htmlType="submit"
        >
          Create new recipe
        </Button>
      </Form.Item>
    </Form>
  );
}