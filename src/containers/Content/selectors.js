import { createSelector } from 'reselect';
import { getStore as getStoreHeadSettings } from 'containers/HeadSettings/selectors';

export const storeName = 'content';

export function getStore(state) {
  return state.get(storeName);
}

export default createSelector(getStore, getStoreHeadSettings, (store, storeHeadSettings) => {
  return {
    content: store.get('content'),
    total: store.get('total'),
    goalsList: store.get('goals_list'),
    headSettings: storeHeadSettings
  };
});
