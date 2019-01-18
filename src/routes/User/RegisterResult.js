import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import Result from '../../components/Result';
import styles from './RegisterResult.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/dashboard"><Button size="large">返回首页</Button></Link>
  </div>
);

export default ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        {console.log(location)}
        你的账户：{location.state ? location.state.account : 'Test'} 注册成功
      </div>
    }
    description="请点击返回首页按钮返回首页。"
    actions={actions}
    style={{ marginTop: 56 }}
  />
);
