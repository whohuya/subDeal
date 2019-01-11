/*
   @flow
 */
import React from 'react'
import { connect } from 'dva'
import { Field, reduxForm } from 'redux-form'

import { Button, Form } from 'antd'

import {
  TextField, NumberField,TextAreaField
} from '../../../common/form/Fields'
import { required } from '../../../helpers/formHelper'

type Props = {
  author: ?Object,
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

class AuthorForm extends React.Component<void, Props, State> {
  state = {
    loading: false
  }

  render () {
    const {handleSubmit, submitButtonText, submitting} = this.props
    return (
      <div>
        <Form onSubmit={handleSubmit} layout='horizontal' className='modal-form'>
          <Field name='serial' type='text' size='default'
            placeholder='序号' label='序号'
            required hasFeedback validate={[required]}
            labelCol={{'span': 6}} wrapperCol={{'span': 18, 'offset': 0}}
            min={1} max={99}
            component={NumberField}
          />
          <Field name='name' type='text' size='default'
            placeholder='作者名' label='作者'
            required hasFeedback validate={[required]}
            labelCol={{'span': 6}} wrapperCol={{'span': 18}}
            component={TextField}
          />
          <Field name='description' type='text' size='default'
            placeholder='作者简介' label='简介'
            hasFeedback
            labelCol={{'span': 6}} wrapperCol={{'span': 18}}
            autosize={{minRows: 4,maxRows: 6 }}
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

const ExportAuthorForm = reduxForm({
  form: 'authorForm'
})(AuthorForm)

function mapStateToProps (state, ownProps) {
  const {author} = ownProps
  return {
    initialValues: author,
    submitButtonText: ownProps.submitButtonText || '提交'
  }
}

export default connect(mapStateToProps)(ExportAuthorForm)
