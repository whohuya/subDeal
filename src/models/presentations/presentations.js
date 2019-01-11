import {
  query, add, update, remove,
  initialize, subscribeLatestUpdated, unsubscribeLatestUpdated
} from '../../services/presentations/presentations'
import { get as getFile } from '../../services/file'
import { routerRedux } from 'dva/router'

export default {
  namespace: 'presentations/presentations',

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
    selectedPresentation: null,
    liveQuery: null,
    latestFileUrl: '',
    loading: true
  },

  effects: {
    * fetch ({payload}, {call, put}) {
      // console.warn('in fetch effects')
      yield put({type: 'updateLoading', payload: true})
      const response = yield call(query, payload)
      console.warn('response: ', response)
      yield put({type: 'save', payload: response})
      yield put({type: 'updateLoading', payload: false})
      return response
    },

    * initialize ({callback}, {call}) {
      const presentation = yield call(initialize)
      if (callback) {
        callback(presentation)
      }
    },

    * subscribe ({callback}, {call}) {
      const liveQuery = yield call(subscribeLatestUpdated)
      if (callback) {
        callback(liveQuery)
      }
    },

    * unsubscribe ({payload}, {call}) {
      yield call(unsubscribeLatestUpdated, payload)
    },

    * getFile ({payload}, {call, put}) {
      const response = yield call(getFile, payload)
      yield put({type: 'updateFileUrl', payload: response.get('url')})
      console.warn(response)
    },

    * update ({payload, callback}, {call, put}) {
      yield call(update, payload)
      // console.warn('updated: ', response)
      yield put(routerRedux.push('/presentations/screen'))
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
      console.warn('action: ', action)
      return {
        ...state,
        data: {...action.payload}
      }
    },
    saveSelected (state, action) {
      console.warn('action: ', action)
      return {
        ...state,
        selectedPresentation: {...action.payload}
      }
    },
    updateLoading (state, action) {
      return {
        ...state,
        loading: action.payload
      }
    },
    updateFileUrl (state, action) {
      return {
        ...state,
        latestFileUrl: action.payload
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
