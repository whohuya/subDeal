import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import Result from '../../components/Result';
import styles from './RegisterResult.less';
const actions = (
  <div className={styles.actions}>
    <Link to="/user/login"><Button size="large">返回登录页面</Button></Link>
  </div>
);

export default ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        你的账户：{location.state ? location.state.account : 'test@gmail.com'} 重置密码请求已发送
      </div>
    }
    description="重置邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接修改账户密码。"
    actions={actions}
    style={{ marginTop: 56 }}
  />
);
