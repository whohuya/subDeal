import React, { Component } from "react";
import { connect } from "dva";
import { routerRedux } from 'dva/router';
import { Link } from "dva/router";
import logo from '../../../public/logo.png'
import { Checkbox, Input, Button, Alert, Icon, Form } from "antd";
import styles from "./Login.less";


const FormItem = Form.Item;

@connect(({ login, loading }) => ({
	login,
	submitting: loading.effects["login/login"]
}))
class NormalLoginForm extends Component {
	state = {
		type: "account",
		autoLogin: true
	};

	onTabChange = type => {
		this.setState({ type });
	};


	handleSubmit = (e, values) => {
		console.log(values);
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log(values);
				this.props.dispatch({
					type: "auth/login",
					payload: values
				});
			}
		});
	};

	renderMessage = content => {
		return (
			<Alert
				style={{ marginBottom: 24 }}
				message={content}
				type="error"
				showIcon
			/>
		);
	};

	render() {
		const { submitting } = this.props;
		const { getFieldDecorator } = this.props.form;
		return (
			<div className={styles.main}>
        <div>
          <img src={logo} style={{width:80,height:80}}/>
          <span style={{fontSize:32,fontWeight:900, color:'#0051A3',marginLeft:8,}}>二手交易市场</span>
        </div>

				<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem>
						{getFieldDecorator("username", {
							rules: [
								{ required: true, message: "Please input your username!" }
							]
						})(
							<Input
								prefix={
									<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
								}
								placeholder="用户名"
							/>
						)}
					</FormItem>
					<FormItem style={{marginBottom:16}}>
						{getFieldDecorator("password", {
							rules: [
								{ required: true, message: "Please input your Password!" }
							]
						})(
							<Input
								prefix={
									<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
								}
								type="password"
								placeholder="密码"
							/>
						)}
					</FormItem>
          <FormItem style={{margin:0}}>
            <Link to={'/user/signUp'} className={styles.signUp} >
              注册账户
            </Link>
            <Link to={'/user/resetPassword'} className={styles.login} >
              忘记密码
            </Link>
          </FormItem>
					<FormItem style={{}}>
						<Button
              size="large"
							type="primary"
							htmlType="submit"
              className={styles.submit}
						>
							登 录
						</Button>

					</FormItem>
				</Form>

			</div>
		);
	}
}

const LoginPage = Form.create()(NormalLoginForm);

export default LoginPage;
