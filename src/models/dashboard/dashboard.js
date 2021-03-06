import { queryCarousel, queryAllGoods, find, query } from '../../services/deal/deal'
import { reloadAuthorized } from '../../utils/Authorized'
import { routerRedux } from 'dva/router'
import commonHelper from '../Helpers/Help'

export default {
  namespace: 'dashboard/dashboard',

  state: {
    roles: [],
    mobilePhoneNumber: '',
    status: undefined,
    loading: false
  },

  effects: {
    * findCarousel ({callback}, {call, put}) {
      const response = yield call(queryCarousel)
      const res = response
        .map(item => item.attributes)
        .map(item => item.url.attributes)
      if (callback) {
        callback(res)
      }
    },
    * findAllGoods ({callback}, {call, put}) {
      const response = yield call(queryAllGoods)
      const res = commonHelper
        .parseObjectArrayToObjectArray(response)
        .map(item => {
          return {
            ...item,
            img: item.img.attributes,
            sellName: item.sellName.attributes
          }
        })
      if (callback) {
        callback(res)
      }
    },
    * findGoodsByType ({payload, callback}, {call, put}) {
      const response = yield call(find, payload)
      const res = commonHelper
        .parseObjectArrayToObjectArray(response)
        .map(item => {
          return {
            ...item,
            img: item.img.attributes,
            sellName: item.sellName.attributes
          }
        })
      if (callback) {
        callback(res)
      }
    },

    * queryById ({payload, callback}, {call, put}) {

      const response = yield  call(query, payload)
      const res = (commonHelper.parseObjectToObject(response))
      const Goods = {...res,img:res.img.attributes,sellName:res.sellName.attributes}
      if (callback) {
        callback(Goods)
      }
    },
  },

  reducers: {}
}
