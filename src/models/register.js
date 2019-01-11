import { fakeRegister } from '../services/api';
import { signUpAdmin, resetPassword} from "../services/auth";
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({payload}, { call, put }) {
      const response = yield call(signUpAdmin,payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
    *reset({payload},{call,put}) {
      const response = yield call(resetPassword, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    }

  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('user');
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
