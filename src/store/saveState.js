import throttle from 'lodash/throttle';
import { saveSessionState, saveLocalState } from './localStorage';
import { CREATE_PROJECT } from '../constants/Forms';

export default function(store) {
    store.subscribe(throttle(() => saveSessionState({
        session: store.getState().session,
    }), 1000))
    store.subscribe(throttle(() => saveLocalState({
        forms: {
            // [CREATE_PROJECT]: store.getState().forms[CREATE_PROJECT]
        }
    }), 1000))
}