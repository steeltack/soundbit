import Immute from 'object-path-immutable';

import {
    REQUEST_PENDING,
    REQUEST_COMPLETE,
    REQUEST_ERROR,
    REQUEST_SUCCESS,
    UPLOAD_PROGRESS
} from '../constants/ActionTypes';

const initialState = {
    request: {
        isRequestInProgress: false,
        isRequestError: false,
        isRequestSuccess: false,
        message: ''
    },
    uploadProgress: 0
}

const Session = {
  state: initialState, 
  actions: {
    [REQUEST_PENDING]: (state, action) => {
        const message = action.data && action.data.message;
		let newState = Immute.set(state, 'request', {
            isRequestInProgress: true,
            isRequestError: false,
            isRequestSuccess: false,
            message
        })
		return newState;
	},
    [REQUEST_COMPLETE]: (state, action) => {
        const message = action.data && action.data.message;
        let newState = Immute.set(state, 'request', {
                isRequestInProgress: false,
                isRequestError: false,
                isRequestSuccess: false,
                message
            })
            return newState;
	},
    [REQUEST_ERROR]: (state, action) => {
        const message = action.data && action.data.message;
        let newState = Immute.set(state, 'request', {
            isRequestInProgress: false,
            isRequestError: true,
            isRequestSuccess: false,
            message
        })
        newState.uploadProgress = initialState.uploadProgress;
		return newState;
	},
    [REQUEST_SUCCESS]: (state, action) => {
        const message = action.data && action.data.message;
		 let newState = Immute.set(state, 'request', {
            isRequestInProgress: false,
            isRequestError: false,
            isRequestSuccess: true,
            message
        })
        newState.uploadProgress = initialState.uploadProgress;
		return newState;
	},
    [UPLOAD_PROGRESS]: (state, action) => {
		return {
            ...state,
            uploadProgress: action.data
        };
	},
  }
}

export default Session;