import { query, add } from "../../services/deal/comment";
import { routerRedux } from "dva/router";
import { Avatar } from "antd";
import commonHelper from "../Helpers/Help";
import moment from "moment";
export default {
  namespace: "dashboard/goods",

  state: {
    comments: []
  },

  effects: {
    *findAll({ payload, callback }, { call, put }) {
      const response = yield call(query, payload);
      const res = commonHelper.parseObjectArrayToObjectArray(response);
      const comments = res.map(item => {
        return {
          author: item.author,
          avatar: (
            <Avatar
              style={{
                backgroundColor: "#1585FF",
                verticalAlign: "middle",
                marginTop: 8
              }}
              size={"large"}
            >
              {item.author}
            </Avatar>
          ),
          content: <p>{item.content}</p>,
          datetime: moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")
        };
      });
      if (callback) {
        callback(comments);
      }
    },
    *add({ payload, callback }, { call, put }) {
      const res = yield call(add, payload);
      const response = commonHelper.parseObjectToObject(res.response);

      const item = {
        author: response.author,
        avatar: (
          <Avatar
            style={{
              backgroundColor: "#1585FF",
              verticalAlign: "middle",
              marginTop: 8
            }}
            size={"large"}
          >
            {response.author}
          </Avatar>
        ),
        content: <p>{response.content}</p>,
        datetime: moment(response.createdAt).format("YYYY-MM-DD HH:mm:ss")
      };

      if (callback) {
        callback(item);
      }
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        comments: [...action.payload]
      };
    }
  }
};
