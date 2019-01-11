
import {query, add, update, remove} from '../../services/readings/readingBooks'

export default {

  namespace:'reading/readingBooks',

  state: {
    data: {
      list: [],
      pagination: {
        showSizeChanger: true, //是否可以改变PageSize
        total: 0,
        current: 1,
        pageSize: 30
      }
    },
    selectedReadingBook: null,
    loading: true
  },

  effects: {
    * fetch ({payload}, {call, put}) {
      //console.warn('reading/readingBooks in fetch effects')
     // console.log(payload)
      yield put({type: 'updateLoading', payload: true})
      const response = yield call(query, payload)
      //console.warn('response: ', response)
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
    // saveSelectedBook (state, action) {
    //   return {
    //     ...state,
    //     selectedBook: {...action.payload}
    //   }
    // },
    updateLoading (state, action) {
      return {
        ...state,
        loading: action.payload
      }
    },
    // updatePagination (state, action) {
    //   return {
    //     ...state,
    //     pagination: {...action.payload}
    //   }
    // }
  }

}
