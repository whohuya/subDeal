/**
 * Created by zhaoyu on 09/07/2017.
 */

import React, { PureComponent } from 'react'
import { Form } from 'antd'
const FormItem = Form.Item

const getValidateStatus = (touched, error, warning, valid) => {
  if (touched) {
    if (error) return 'error'
    if (warning) return 'warning'
    if (valid) return 'success'
  }
  return ''
}

export const mapMetaInput = ({
  meta: { touched, error, warning, valid } = {},
  input: { ...inputProps },
  ...props
}) => ({
  ...props,
  ...inputProps,
  validateStatus: getValidateStatus(touched, error, warning, valid),
  help: touched && (error || warning)
})

export const combineReduxProps = customPropsFun => props => ({
  ...mapMetaInput(props),
  ...customPropsFun(props)
})

export default function createComponent (Component, mapProps) {
  class InputComponent extends PureComponent {
    getRenderedComponent () {
      return this.refs.component
    }

    render () {
      const {
        label,
        labelCol,
        wrapperCol,
        help,
        extra,
        validateStatus,
        hasFeedback = false,
        colon,
        ...rest
      } = mapProps(this.props)

      return (
        <FormItem
          label={label}
          ref='component'
          wrapperCol={wrapperCol}
          labelCol={labelCol}
          help={help}
          hasFeedback={hasFeedback}
          extra={extra}
          validateStatus={validateStatus}
          colon={colon}
        >
          <Component {...rest} />
        </FormItem>
      )
    }
  }

  return InputComponent
}
