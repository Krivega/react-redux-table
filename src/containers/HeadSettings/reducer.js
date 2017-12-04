import { fromJS, Map } from 'immutable';

import { SET_HEAD_SETTINGS } from './constants';
import { storeName } from './selectors';

const initialState = Map();

function setHeadSettings(state, { settings }) {
  return fromJS(settings);
}

export default {
  [storeName]: function(state = initialState, action) {
    switch (action.type) {
      case SET_HEAD_SETTINGS:
        return setHeadSettings(state, action.data);
      default:
        return state;
    }
  }
};
