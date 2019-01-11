import { query, queryAll,add, update, remove } from '../../services/basic/authors'

export default {
  namespace: 'basic/authors',

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
    selectedAuthor: null, // 备用字段
    loading: true
  },

  effects: {
    * fetch ({payload}, {call, put}) {
      console.warn('in fetch effects')
      yield put({type: 'updateLoading', payload: true})
      //console.log(payload)  //{search: "李白", pagination:{total: 6, current: 1, pageSize: 30, showSizeChanger: true}, sorter: null}
      const response = yield call(query, payload)
      console.warn('response: ', response)  //?
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
      const response = yield call(add, payload)
      if (callback) {
        callback(response)
      }
    },

    * update ({payload, callback}, {call}) {
      // console.warn(payload)
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
    saveAll: function (state, action) {
      return {
        ...state,
        selectedAuthor: {...action.payload}
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
