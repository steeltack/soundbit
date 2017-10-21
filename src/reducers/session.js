import {
    LOGIN,
    LOGOUT,
    LOGIN_ATTEMPT_ROUTE
} from '../constants/ActionTypes';


const initialState = {
    loginAttemptRoute: null,
    isLoggedIn: false
}

const Session = {
  state: initialState, 
  actions: {
      [LOGIN]: (state, action) => {
        const { account, token } = action.data;
		return {
			...state,
			...account,
            token: `Bearer ${token}`,
            isLoggedIn: !!account && !!token,
		};
	},
    [LOGIN_ATTEMPT_ROUTE]: (state, action) => {
		return {
			...state,
			loginAttemptRoute: action.data,
		};
	},
    [LOGOUT]: (state, action) => {
		return initialState;
	},
  }
}

export default Session;