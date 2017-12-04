import { Map } from 'immutable';

import { storeName } from './selectors';

const initialState = Map();

export default {
  [storeName]: function(state = initialState, action) {
    return state;
  }
};
