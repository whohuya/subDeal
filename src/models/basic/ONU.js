import { query, queryAll, add, update, remove } from '../../services/basic/ONU'
import commonHelper from '../../helpers/commonHelper'
import { getCurrentUser } from '../../services/auth'
export default {
  namespace: 'basic/ONU',

  state: {
    data: {
      list: [],
      pagination: {
        showSizeChanger: true,
        total: 0,
        current: 1,
        pageSize: 30
      }
    },
    allNotices: [],
    selectedNotice: null,
    loading: true
  },

  effects: {
    * fetch ({payload}, {call, put}) {
      yield put({type: 'updateLoading', payload: true})
      console.log(payload)
      const response = yield call(query, payload)
      console.log('res')
      console.log(response)

      yield put({type: 'save', payload: response})
      yield put({type: 'updateLoading', payload: false})
      return response
    },

    * fetchAll ({callback}, {call, put}) {
      const response = yield call(queryAll)
      yield put({type: 'saveAll', payload: response})
      if (callback) {
        callback(response)
      }
    },

    * add ({payload, callback}, {call}) {
      const ONU={...payload.ONU,creator:getCurrentUser()}
      const response = yield call(add, {ONU})
      if (callback) {
        callback(response)
      }
    },

    * update ({payload, callback}, {call}) {
      const response = yield call(update, payload)
      // console.warn(response)
      if (callback) {
        callback()
      }
    },

    * remove ({payload, callback}, {call, put}) {
      yield put({type: 'updateLoading', payload: true})
      yield call(remove, payload)
      yield put({type: 'updateLoading', payload: false})
      if (callback) {
        callback()
      }
    }
  },

  reducers: {
    save (state, action) {
      // console.warn(action)
      return {
        ...state,
        data: {...action.payload}
      }
    },
    saveAll (state, action) {
      return {
        ...state,
        allNotices: [...action.payload]
      }
    },
    saveSelectedNotice (state, action) {
      return {
        ...state,
        selectedNotice: {...action.payload}
      }
    },
    updateLoading (state, action) {
      return {
        ...state,
        loading: action.payload
      }
    },
    updatePagination (state, action) {
      return {
        ...state,
        pagination: {...action.payload}
      }
    }
  }
}
