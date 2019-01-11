import React, { Component } from 'react'
import { connect } from 'dva'
import { routerRedux, Link } from 'dva/router'
import { Form, Input, Button, Select, Row, Col, Popover, Progress } from 'antd'
import styles from './Register.less'

const FormItem = Form.Item

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
}

@connect(({register, loading}) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
export default class ResetPassword extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',

  }

  componentWillReceiveProps (nextProps) {
    const account = this.props.form.getFieldValue('email')
    if (nextProps.register.status === 'ok') {
      this.props.dispatch(routerRedux.push({
        pathname: '/user/reset-result',
        state: {
          account,
        },
      }))
    }
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  onGetCaptcha = () => {
    let count = 59
    this.setState({count})
    this.interval = setInterval(() => {
      count -= 1
      this.setState({count})
      if (count === 0) {
        clearInterval(this.interval)
      }
    }, 1000)
  }

  getPasswordStatus = () => {
    const {form} = this.props
    const value = form.getFieldValue('password')
    if (value && value.length > 9) {
      return 'ok'
    }
    if (value && value.length > 5) {
      return 'pass'
    }
    return 'poor'
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields({force: true}, (err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'register/reset',
          payload: {
            ...values,
          },
        })
        console.log(values)

      }
    })
  }

  changePrefix = (value) => {
    this.setState({
      prefix: value,
    })
  }

  renderPasswordProgress = () => {
    const {form} = this.props
    const value = form.getFieldValue('password')
    const passwordStatus = this.getPasswordStatus()
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null
  }

  render () {
    const {form, submitting} = this.props
    const {getFieldDecorator} = form

    return (
      <div className={styles.main}>
        <h3>重置密码</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '请输入需要重置账号的邮箱地址！',
                },
                {
                  type: 'email',
                  message: '邮箱地址格式错误！',
                },
              ],
            })(<Input size="large" placeholder="邮箱"/>)}
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
             重置
            </Button>
            <Link className={styles.login} to="/user/login">
              返回登录界面
            </Link>
          </FormItem>
        </Form>
      </div>
    )
  }
}
