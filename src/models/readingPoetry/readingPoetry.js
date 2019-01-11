import { query, add, update, remove } from '../../services/readingPoetry/readingPoetry'

export default {
  namespace: 'readingPoetry/readingPoetry',

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
    selectedReadingPoetry: null,
    loading: true
  },

  effects: {
    * fetch ({payload}, {call, put}) {
      console.warn('in fetch effects')
      yield put({type: 'updateLoading', payload: true})
      const response = yield call(query, payload)
      console.warn('response: ', response)
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
    saveSelectedReadingPoetry (state, action) {
      return {
        ...state,
        selectedReadingPoetry: {...action.payload}
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
