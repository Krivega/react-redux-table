import { createStore } from 'redux';
import { fromJS } from 'immutable';
import throttle from 'lodash/throttle';
import reducers from 'reducers';
import { loadState, saveState } from './localStorage';
import storeData from './store-data.json';
import getHeadSettingsStorage from 'containers/HeadSettings/localStorage';

export default function storeConfigure() {
  const persistedState = loadState();
  const store = createStore(reducers, fromJS({ content: storeData, ...persistedState }));

  store.subscribe(
    throttle(() => {
      const state = store.getState();
      const headSettingsStorage = getHeadSettingsStorage(state);

      saveState({ ...headSettingsStorage });
    }, 1000)
  );

  return store;
}
