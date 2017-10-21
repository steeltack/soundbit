import { combineReducers } from 'redux';
import map from 'lodash/map';
import fromPairs from 'lodash/fromPairs';
import merge from 'lodash/merge';
import * as reducerConst from '../constants/Reducers';
import createReducer from '../utils/createReducer';
import defaultCrud from './defaultCrud';
import CrudConfigs from './crudConfigs';
import session from './session';
import forms from './forms';
import appState from './appState';

/**
 * Reducers have been boiled down to a config object
 * replacing the switch statement. The config is imported
 * and added to combined reduce configs.
 */
const combineReducerConfigs = {
    session,
    forms,
    appState
}

/**
 * Takes an object of reducer configs in the form:
 * 
 *  {
 *      reducername: {
 *          state: {}
 *          actions: {
 *              [actionName]: (state, action) => {},
 *          }
 *      }
 *      otherReducer...
 *  }
 * 
 *  and an object of constants that creates reducers with default functions in the form:
 * 
 *  {
 *      REDUCER_NAME: 'reducer name'
 *  }
 * 
 *  If a reducer from a config has the same name from a reducer made from a constant, both reducers
 *  will be merged together.
 */
export function createReducers(reducerConfigs, reducerConstants) {
    
    // create default actions for reducer constatns
    const reducerDefaultCRUD =  fromPairs(
        map(reducerConstants , reducer =>  {

            // additional information to pass to the reducer for individual crud types
            const config = CrudConfigs[reducer];
            return [reducer, defaultCrud(reducer, config)];
        })
    );

    // merge all reducer configs
    const reducersReadyToBeCreated =  merge(reducerDefaultCRUD, reducerConfigs)

    // create reducers
    const createdReducers =  fromPairs(
        map(reducersReadyToBeCreated, (reducerConfig, reducerName) => {
            return [reducerName, createReducer(reducerConfig.state || {}, reducerConfig.actions)]
        })
    );

    return createdReducers;
}

export const rootReducer = combineReducers({
    ...createReducers(combineReducerConfigs, reducerConst), 
});
