import { combineReducers } from 'redux-immutable';
import contentReducer from 'containers/Content/reducer';
import headSettingsReducer from 'containers/HeadSettings/reducer';

export default combineReducers({
  ...contentReducer,
  ...headSettingsReducer
});
