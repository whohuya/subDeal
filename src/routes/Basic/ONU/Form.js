/**
 * Created by zhaoyu on Jan 11, 2018.
 * @flow
 */
import React from 'react'
import { connect } from 'dva'
import { Field, reduxForm } from 'redux-form'

import { Button, Form } from 'antd'
import {judge} from '../../../constants/optionsValues'

import {
  TextField, NumberField, TextAreaField,SelectField,SwitchField,DateField
} from '../../../common/form/Fields'
import { required } from '../../../helpers/formHelper'

type Props = {
  ONU: ?Object,
  handleSubmit: () => void,
  pristine: boolean,
  submitting: boolean,
  submitButtonText: string,
  reset: () => void,
  onChange: () => void
}

type State = {
  loading: boolean
}

class ONUForm extends React.Component<void, Props, State> {
  state = {
    loading: false
  }

  render () {
    const {handleSubmit, submitButtonText, submitting} = this.props
    return (
      <div>
        <Form onSubmit={handleSubmit} layout='horizontal' className='modal-form'>


          <Field name='sn' type='text' size='default'
            placeholder='请输入sn' label='sn'
            required hasFeedback validate={[required]}
            labelCol={{'span': 6}} wrapperCol={{'span': 18}}
            component={TextField}
          />
          <Field name='building' type='text' size='default'
            placeholder='请输入楼宇' label='楼宇'
            required hasFeedback validate={[required]}
            labelCol={{'span': 6}} wrapperCol={{'span': 18}}
            component={TextField}
          />
          <Field name='room' type='text' size='default'
            placeholder='请输入房间号' label='房间号'
            required hasFeedback validate={[required]}
            labelCol={{'span': 6}} wrapperCol={{'span': 18}}
            component={TextField}
          />
          <Field name='description' type='text' size='default'
            placeholder='请输入描述' label='描述'
            required hasFeedback validate={[required]}
            labelCol={{'span': 6}} wrapperCol={{'span': 18}}
            component={TextAreaField}
          />
          <Button
            type='primary' htmlType='submit' disabled={submitting}
            className='modal-form-button'>{submitButtonText}</Button>
        </Form>
      </div>
    )
  }
}

const ExportONUForm = reduxForm({
  form: 'ONUForm'
})(ONUForm)

function mapStateToProps (state, ownProps) {
  const {ONU} = ownProps
  return {
    initialValues: ONU,
    submitButtonText: ownProps.submitButtonText || '提交'
  }
}

export default connect(mapStateToProps)(ExportONUForm)
