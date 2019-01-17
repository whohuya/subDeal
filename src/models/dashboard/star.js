import { queryStar, add, cancel, fetchUserStar } from '../../services/deal/star'
import { query } from '../../services/deal/deal'
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

    * isStar ({payload, callback}, {call, put}) {
      const res = yield  call(queryStar, payload)
      const starBool = res.length === 0 ? false : res.length === 1 ? true : null
      if (callback) {
        callback(starBool)
      }
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
    * fetchByUserId ({payload, callback}, {call}) {
      const response = yield call(fetchUserStar, payload)
      const res = commonHelper.parseObjectArrayToObjectArray(response)
                              .map(item => {
                                return {
                                  ...item,
                                  starGoods: item.starGoods.attributes,
                                  starName: item.starName.attributes,
                                }
                              })
                              .filter(item=>!item.starGoods.sold&&item)

      if(callback){
        callback(res)

      }},
    * add ({payload, callback}, {call}) {
      const response = yield call(add, payload)
      if (callback) {
        callback(response.status)
      }
    },
    * cancel ({payload, callback}, {call}) {
      const response = yield call(cancel, payload)
      if (callback) {
        callback(response.status)
      }
    }
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
