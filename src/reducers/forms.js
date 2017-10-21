import Immute from 'object-path-immutable';
/**
 * This reducer takes care of the state of all forms.
 * 
 * Forms are saved under a form name. 
 * For example, if you have a login form and use the name 'login' (the form name is passed to the FormFactory component as formName),
 * all input values for the login form will be saved in:
 *  
 * state.forms.login 
 * 
 * and any validation errors for the login form will be saved to;
 * 
 * state.forms.errorlogin
 * 
 * The values in state.forms.login are passed back to the FormFactory component with the form name login
 * and each component will receive the the value for it's input name.
 * For example, if your login form has an an email input and a password input:
 * 
 * const inputs = [
 *  {
 *    name: 'email',
 *    type: 'email',
 *    value: '',
 *    validate: ['required']
 *  },
 *  {
 *    name: 'password',
 *    type: 'password,
 *    value: '',
 *    validate: ['required']
 *  }
 * ]
 * 
 * state.forms.login will look like:
 * 
 *  {
 *    email: ''
 *    password: ''
 *  }
 * 
 *  and when the user types into the files, state.forms.
 *  login will reflect what the user has typed.
 * 
 *  If the form inputs have validation and do not pass the validation, for example if they are required,
 *  state.forms.errorlogin will look like:
 * 
 *  {
 *    email: 'Field is required.'
 *    password: 'Field is required.'
 *  }
 * 
 * and the error message will be passed to the input component with the key 'errorMessage'.
 * 
 * For other important pieces to this reducer:
 * See actions/forms
 * See components/form/FormFactory.js
 *
 */

import {
  UPDATE_FIELD,
  CLEAR_FORM,
  CLEAR_ERRORS,
  REMOVE_FIELD,
  RESET_FIELD
} from '../constants/ActionTypes';


const forms = {
  state: {}, 
  actions: {
    [UPDATE_FIELD]: (state, action) => {
      const { formName, name, value } = action.data;
      const newState = Immute.set(state, `${formName}.${name}`, value)
      return newState;
    },

    [REMOVE_FIELD]: (state, action) => {
      const { formName, name } = action.data;
      let newState = Immute.del(state, `${formName}.${name}`)
      newState = Immute.del(newState, `error${formName}.${name}`)
      return newState;
    },
    
    [RESET_FIELD]: (state, action) => {
      const { formName, name, value} = action.data;
      let newState = Immute.set(state, `${formName}.${name}`, value)
      newState = Immute.set(newState, `error${formName}.${name}`, '')
      return newState;
    },

    [CLEAR_FORM]: (state, action) => {
      const formName = action.data;
      const newState = { ...state }
      newState[formName] = {}
      newState[`error${formName}`] = {};
      return newState;
    },
    
    [CLEAR_ERRORS]: (state, action) => {
      const formName = action.data;
      const newState = { ...state }
      newState[`error${formName}`] = {};
      return newState;
    },
  }
};


export default forms;
