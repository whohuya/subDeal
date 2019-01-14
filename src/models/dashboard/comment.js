import { query,add } from '../../services/deal/comment'
import { routerRedux } from 'dva/router'
import { Avatar } from 'antd'
import commonHelper from '../Helpers/Help'
import moment from 'moment'
export default {
  namespace: 'dashboard/comment',

  state: {
    comments:[],
  },

  effects: {
    * findAll ({payload, callback}, {call,put}) {
      const response = yield call(query, payload)
      const res = commonHelper
        .parseObjectArrayToObjectArray(response)
      const comments = res.map(item => {
        return {
          author: item.author,
          avatar: <Avatar
            style={{
            backgroundColor: '#1585FF',
            verticalAlign: 'middle',
            marginTop: 8
          }}
            size={'large'}>
            {item.author}
          </Avatar>,
          content:<p>{item.content}</p>,
          datetime: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
        }
      })
      yield put({type: 'save', payload: comments})
      if (callback) {
        callback(comments)
      }
    },
    * add({payload,callback},{call}){
      const res=yield call(add,payload)
      if(callback){
        callback(res.status)
      }
    }
  },

  reducers: {
    save (state, action) {
      return {
        ...state,
        comments: [...action.payload]
      }
    },
  }
}
