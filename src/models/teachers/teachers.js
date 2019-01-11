import { query, search, queryAll, add, update, remove } from '../../services/teachers/teachers'

export default {
  namespace: 'teachers/teachers',

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
    allTeachers: [],
    selectedTeacher: null,
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

    * fetchAll ({callback}, {call, put}) {
      const response = yield call(queryAll)
      yield put({type: 'saveAll', payload: response})
      if (callback) {
        callback(response)
      }
    },
    * search ({payload, callback}, {call}) {
      const response = yield call(search, payload)
      console.log(response)
      if (callback) {
        callback(response)
      }
    },
    * add ({payload, callback}, {call}) {
      console.log(payload)
      const response = yield call(add, payload)
      if (callback) {
        callback(response)
      }
    },

    * update ({payload, callback}, {call}) {
      console.log(payload)
      const response = yield call(update, payload)
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
      return {
        ...state,
        data: {...action.payload}
      }
    },
    saveAll (state, action) {
      return {
        ...state,
        allTeachers: [...action.payload]
      }
    },
    saveSelectedTeacher (state, action) {
      return {
        ...state,
        selectedTeacher: {...action.payload}
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
