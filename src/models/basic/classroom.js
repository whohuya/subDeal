import { queryAll } from "../../services/basic/classroom";

export default {
  namespace: "basic/classroom",
  state: {
    classroomList: []
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAll, payload);
      console.log("modal");
      console.log(response);
      const response2 = response.map(index => {
        return index.attributes;
      });
      yield put({ type: "save", payload: response2 });
    }
  },

  reducers: {
    save(state, payload) {
      console.log(payload);
      return {
        ...state,
        classroomList: payload
      };
    }
  }
};
