import { query, search, add, update, remove } from '../../services/users/users'

export default {
  namespace: 'users/users',

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
    loading: true
  },

  effects: {
    * fetch ({payload}, {call, put}) {
      yield put({type: 'updateLoading', payload: true})
      const response = yield call(query, payload)
      yield put({type: 'save', payload: response})
      yield put({type: 'updateLoading', payload: false})
      return response
    },

    * add ({payload, callback}, {call}) {
      const response = yield call(add, payload)
      if (callback) {
        callback(response)
      }
    },

    * update ({payload, callback}, {call}) {
      console.warn(payload)
      const response = yield call(update, payload)
      console.warn(response)
      if (callback) {
        callback()
      }
    },

    * search ({payload, callback}, {call}) {
      const response = yield call(search, payload)
      if (callback) {
        callback(response)
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
      console.warn(action)
      return {
        ...state,
        data: {...action.payload}
      }
    },
    updateLoading (state, action) {
      return {
        ...state,
        loading: action.payload
      }
    }
  }
}
