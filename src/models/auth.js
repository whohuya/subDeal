import { login, logout,signUpAdmin } from "../services/auth";
import { reloadAuthorized } from "../utils/Authorized";
import { routerRedux } from "dva/router";

export default {
	namespace: "auth",

	state: {
		roles: [],
		mobilePhoneNumber: "",
		status: undefined,
		loading: false
	},

	effects: {
		*login({ payload }, { call, put }) {
			console.warn("in fetch effects");
			yield put({ type: "updateLoading", payload: true });
			const response = yield call(login, payload);
			console.warn("response: ", response);
			// save username

			// save user roles
			yield put({ type: "changeAuthStatus", payload: response });

			yield put({ type: "updateLoading", payload: false });
			if (response.status === "ok") {
				console.log("status ok");
				console.log("back");
				reloadAuthorized();
				yield put(routerRedux.push("/"));
			}
		},
    *signUp({payload},{call,put}){
		  const response= yield call(signUpAdmin,payload)
      return response
    },
		*logout(_, { call, put, select }) {
			try {
				console.warn("in auth/logout!");
				yield call(logout);
				// get location pathname
				const urlParams = new URL(window.location.href);
				const pathname = yield select(state => state.routing.location.pathname);
				// add the parameters in the url
				urlParams.searchParams.set("redirect", pathname);
				window.history.replaceState(null, "login", urlParams.href);
			} finally {
				yield put({
					type: "changeAuthStatus",
					payload: {
						status: false,
						roles: []
					}
				});
				reloadAuthorized();
				yield put(routerRedux.push("/user/login"));
			}
		}
	},

	reducers: {
		changeAuthStatus(state, { payload }) {
			console.warn("payload in changeAuthStatus reducer");
			console.warn(payload);
			const [...roles] = payload.roles;
			return {
				...state,
				roles,
				status: payload.status
			};
		},
		updateLoading(state, action) {
			return {
				...state,
				loading: action.payload
			};
		}
	}
};
