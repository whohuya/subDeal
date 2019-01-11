import {
  query,
  queryAll,
  select,
  add,
  update,
  remove
} from '../../services/teachers/majorClassTeacher'

export default {
  namespace: 'teachers/majorClassTeacher',

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
    allMajorClassTeacher: [],
    // selectedMajorClassTeacherList: [],
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

    * select ({payload, callback}, {call, put}) {
      console.log(payload)
      const response = yield call(select, payload)
      console.log(response)
      // yield put({type: 'saveSelectedMajorClassTeacherList', payload: response})
      if (callback) {
        callback(response)
      }
    },

    * add ({payload, callback}, {call}) {
      console.log(payload)
      const response = yield call(add, payload)
      console.log(response)
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
        allMajorClassTeacher: [...action.payload]
      }
    },
    // saveSelectedMajorClassTeacherList (state, action) {
    //   return {
    //     ...state,
    //     selectedMajorClassTeacherList: [...action.payload]
    //   }
    // },
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
