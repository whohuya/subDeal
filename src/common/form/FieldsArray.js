import React from 'react'
import { Field } from 'redux-form'

import { required } from '../../../businessLogic/formHelper'

import {
  AutoCompleteField
} from './Fields'

import { Form, Icon, Button, Row, Col } from 'antd'

const FormItem = Form.Item

const formItemLayoutButton = {
  wrapperCol: {
    span: 18, offset: 4
  }
}

const FieldsArray = ({fields, input, hintText, dataSource, label, buttonLabel, meta: {touched, error}}) => (
  <div>
    {fields.map((content, index) => (
      <Row key={index} gutter={4}>
        <Col span={16}>
          <Field name={content} type='text' size='default'
            placeholder={hintText} label={index === 0 ? label : ''}
            style={{width: '90%', marginRight: 8}}
            required hasFeedback validate={[required]}
            labelCol={{'span': 6}} wrapperCol={index === 0 ? {'span': 18} : {'span': 18, offset: 6}}
            component={AutoCompleteField} dataSource={dataSource}
          />
        </Col>
        <Col span={4}>
          <Button disabled={fields.length === 1} type='danger'
            ghost
            onClick={() => fields.remove(index)}>
            <Icon
              className='dynamic-delete-button'
              type='minus-circle-o'
            />
          </Button>
        </Col>
      </Row>
    ))
    }
    <FormItem {...formItemLayoutButton}>
      <Button type='dashed' onClick={() => fields.push()} style={{width: '60%'}}>
        <Icon type='plus' />{buttonLabel}
      </Button>
    </FormItem>
  </div>
)

export default FieldsArray
