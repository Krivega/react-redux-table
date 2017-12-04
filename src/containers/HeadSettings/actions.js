import { SET_HEAD_SETTINGS } from './constants';

export const setHeadSettings = settings => {
  return {
    type: SET_HEAD_SETTINGS,
    data: { settings }
  };
};
