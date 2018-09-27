/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import { FATCH_ACTION_SUCCESS_PREFIX } from 'utils/constants';

import {
  UPDATE_DOWNLOAD_LIST,
  UPDATE_PLATFORM_AUTH,
  UPDATE_FIX,
  GET_LOGIN_USER_INFO,
  GET_DOWNLOAD_LIST,
  LOAD_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false, // 全局错误处理
  platformAuth: true,
  currentUser: {},
  downloadListModal: {
    show: false,
    data: [],
  },
  nameMap: {
    test: '测试',
    billdetail: '账单明细',
  },
  authList: [],
  isSuper: 0,
  fix: {}, // 这是一个神奇的状态 emmmm 用来同步路由状态，因为它时不时的不好使……
  region: [], // 这是从权限里获取到的地区信息（大区、区域）【张静】
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ERROR:
      return state
        .set('error', fromJS(action.error));
    case UPDATE_FIX:
      return state
        .set('fix', fromJS({ key: new Date() }));
    case UPDATE_DOWNLOAD_LIST:
      return state
        .set('downloadListModal', fromJS(action.payload));
    case UPDATE_PLATFORM_AUTH:
      localStorage.platformAuth = action.payload;
      return state
        .set('platformAuth', action.payload);

    case `${FATCH_ACTION_SUCCESS_PREFIX}${GET_DOWNLOAD_LIST}`:
      if (action.payload && action.payload.data) {
        return state
          .setIn(['downloadListModal', 'data'], fromJS(action.payload.data.list));
      }
      return state;

    case `${FATCH_ACTION_SUCCESS_PREFIX}${GET_LOGIN_USER_INFO}`:
      if (action.payload && action.payload.data) {
        const {
          privilege_list, is_super, data_auth, chinesename, phone,
        } = action.payload.data;
        const region = Object.values(data_auth.region);
        return state
          .set('authList', fromJS(privilege_list))
          .set('isSuper', is_super)
          .set('region', fromJS(region))
          .set('currentUser', fromJS({
            chinesename,
            phone,
          }));
      }
      return state;
    default:
      return state;
  }
}

export default appReducer;
