/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import {
  LOAD_ERROR,
  GET_DOWNLOAD_LIST,
  GET_LOGIN_USER_INFO,
  UPDATE_DOWNLOAD_LIST,
  UPDATE_PLATFORM_AUTH,
  UPDATE_FIX,
} from './constants';

import {
  getDownloadListService,
  getLoginUserInfoService,
} from './services';

export function repoLoadingError(error) {
  return {
    type: LOAD_ERROR,
    error,
  };
}

export function updateFix() {
  return {
    type: UPDATE_FIX,
  };
}

export function getLoginUserInfo() {
  return {
    type: GET_LOGIN_USER_INFO,
    service: getLoginUserInfoService,
  };
}

export function showDownloadListModal() {
  return {
    type: UPDATE_DOWNLOAD_LIST,
    payload: {
      show: true,
      data: [],
    },
  };
}

export function updateDownloadList(payload) {
  return {
    type: UPDATE_DOWNLOAD_LIST,
    payload,
  };
}

export function updatePlatformAuth(payload) {
  return {
    type: UPDATE_PLATFORM_AUTH,
    payload,
  };
}

export function getDownloadList() {
  return {
    type: GET_DOWNLOAD_LIST,
    service: getDownloadListService,
  };
}
