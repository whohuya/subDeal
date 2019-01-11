import AV from "leancloud-storage/live-query";
// import AV from 'leancloud-storage'
import { notification, message } from "antd";

// 测试
const appId = "0iuRNrBEuGL0HagVzBTFlfhy-gzGzoHsz";
const appKey = "Hmz2Yo1ubqT2ykn3iQ9wQL8l";

// import Promise
export const Promise = require("bluebird");

AV.init({ appId, appKey });

export const Parse = AV;

// handle parse error messages
// todo: 需要进行错误处理：202-已存在；203-email已存在，214-mobilePhoneNumber已存在
export const handleError = (error: Object): Object => {
  try {
    switch (error.code) {
      case 201: {
        // missing password
        return;
      }
      case 210: {
        notification.error({
          message: "发生错误",
          description: "用户名密码不匹配"
        });
        return;
      }
      case 219: {
        // 登录失败次数超过限制
        notification.error({
          message: "超过次数限制",
          // description: error.message
          description:
            "登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码。"
        });
        return;
      }
      default:
        notification.error({
          message: "发生未知错误",
          description: "发生未知错误"
        });
    }
  } catch (error) {
    console.warn(error);
    message.error("在错误处理时发生错误");
  }
};
