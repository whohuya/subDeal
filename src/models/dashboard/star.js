import { query,queryStar } from '../../services/deal/deal'
import { reloadAuthorized } from '../../utils/Authorized'
import { routerRedux } from 'dva/router'
import commonHelper from '../Helpers/Help'

export default {
  namespace: 'dashboard/star',

  state: {
    roles: [],
    mobilePhoneNumber: '',
    status: undefined,
    loading: false
  },

  effects: {
    *findStar({payload,callback},{call,put}){
      const res= yield  call(queryStar,payload)
      yield put({type: 'save', payload: response})
    },
    *isStar({payload,callback},{call,put}){
      const res= yield  call(queryStar,payload)
      const starBool=res.length===0?false:res.length===1?true:null
      if(callback)callback(starBool)
     },

    * queryById ({payload, callback}, {call, put}) {
      const response = yield  call(query, payload)
      const res = {
        ...response.attributes,
        img: response.attributes.img.attributes,
      }
      if (callback) {
        callback(res)
      }
    },
  },

  reducers: {
    save (state, action) {
      return {
        ...state,
        star: {...action.payload}
      }
    },
  }
}
