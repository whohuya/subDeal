import { queryBySellName,cancel,replay,queryByReplay,update} from "../../services/deal/sellGoods";
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
    *findAll({ payload, callback }, { call }) {
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
    *add({ payload, callback }, { call }) {
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
    },
    *fetchBySellName({payload,callback},{call}){
     const res= yield call(queryBySellName,payload)
      const response=commonHelper.parseObjectArrayToObjectArray(res)
                                 .map(item=>{return {...item,img:item.img.attributes,sellName:item.sellName.attributes}})
      if(callback){
       callback(response)
      }
    },
    *fetchByReplay({payload,callback},{call}){
      const res= yield call(queryByReplay,payload)
      const response=commonHelper.parseObjectArrayToObjectArray(res)
                                 .map(item=>{return {...item,img:item.img.attributes,sellName:item.sellName.attributes}})
      if(callback){
        callback(response)
      }
    },
    *replay({payload,callback},{call}){
     const res= yield call(replay,payload)
      if(callback){
       callback(res.status)
      }
    },
    *sell({payload,callback},{call}){
     const res= yield call(cancel,payload)
      if(callback){
       callback(res.status)
      }
    },
    *update({payload,callback},{call}){
      const res=yield call(update,payload)
      if(callback){
        callback(res.status)
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
