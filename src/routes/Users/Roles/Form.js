/**
 * Created by zhaoyu on Mar 15, 2018.
 * @flow
 */
import React from 'react'
import { connect } from 'dva'
import { Field, reduxForm } from 'redux-form'

import { Button, Form } from 'antd'

import {
  TextField, NumberField
} from '../../../common/form/Fields'
import { required } from '../../../helpers/formHelper'

type Props = {
  role: ?Object,
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

class RoleForm extends React.Component<void, Props, State> {
  state = {
    loading: false
  }

  render () {
    const {handleSubmit, submitButtonText, submitting} = this.props
    return (
      <div>
        <Form onSubmit={handleSubmit} layout='horizontal' className='modal-form'>
          <Field name='rolename' type='text' size='default'
            placeholder='' label='用户名'
            required hasFeedback validate={[required]}
            labelCol={{'span': 6}} wrapperCol={{'span': 18}}
            component={TextField}
          />
          <Field name='password' type='password' size='default'
            placeholder='' label='密码'
            required hasFeedback validate={[required]}
            labelCol={{'span': 6}} wrapperCol={{'span': 18}}
            component={TextField}
          />
          <Field name='mobilePhoneNumber' type='text' size='default'
            placeholder='' label='手机号码'
            labelCol={{'span': 6}} wrapperCol={{'span': 18}}
            component={TextField}
          />
          <Button
            type='primary' htmlType='submit' disabled={submitting}
            className='modal-form-button'>{submitButtonText}</Button>
        </Form>
      </div>
    )
  }
}

const ExportRoleForm = reduxForm({
  form: 'roleForm'
})(RoleForm)

function mapStateToProps (state, ownProps) {
  const {role} = ownProps
  return {
    initialValues: role,
    submitButtonText: ownProps.submitButtonText || '提交'
  }
}

export default connect(mapStateToProps)(ExportRoleForm)
