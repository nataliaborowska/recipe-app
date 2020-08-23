import React from 'react';
import {Form, Button, Input, InputNumber, Select} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {v4 as uuidv4} from 'uuid';

import {cuisineList} from '../../../utils/cuisineList';
import {IFormField} from '../CreateRecipe';
import {IRecipeData} from '../../../store/reducers/recipeReducer';

interface IPropTypes {
  isFormValid: boolean;
  onFormSubmit: (values: any) => void;
  onFormSubmitFailed: () => void;
  onFormFieldsChange: (changedFields: Array<IFormField>, allFields: Array<IFormField>) => void;
}

export const CreateRecipeForm: React.FC<IPropTypes> = (props) => {
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
      data-test="component-create-recipe-form"
      name="create-recipe"
      onFinish={props.onFormSubmit}
      onFinishFailed={props.onFormSubmitFailed}
      onFieldsChange={props.onFormFieldsChange}
    >
      <Form.Item
        data-test="create-recipe-name"
        label="Name"
        name="name"
        rules={[{required: true}]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        data-test="create-recipe-description"
        label="Description"
        name="description"
        rules={[{required: true}]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        data-test="create-recipe-servings"
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
        data-test="create-recipe-calories"
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
        data-test="create-recipe-prep-time"
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

      <Form.Item
        data-test="create-recipe-cuisine-type"
        label="Cuisine type"
        name="cuisineType"
        rules={[{required: true}]}
      >
        <Select
          mode="multiple"
          placeholder="Select cuisine type"
        >
          {cuisineList.map(cuisine => (
            <Select.Option
              key={uuidv4()}
              value={cuisine}
            >
              {cuisine}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.List
        data-test="create-recipe-ingredients"
        name="ingredients"
      >
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

      <Form.List
        data-test="create-recipe-instructions"
        name="instructions"
      >
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
          data-test="create-recipe-submit-button"
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