/*
 * DriverManage Actions
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
  GET_CITY_LIST,
  GET_ORDER_CONFIG,
  GET_ORDER_LIST,
  UPDATE_SEARCH_CONDITION,
  UPDATE_ORDER_CONFIG_MAP,
  DOWNLOAD_ORDER_LIST,
} from './constants';

import {
  getCityListService,
  getOrderListService,
  getOrderConfigService,
  downloadOrderListService,
} from '../../services';

// 数据后台
export function updateSearchCondition(payload) {
  return {
    type: UPDATE_SEARCH_CONDITION,
    payload,
  };
}
export function getCityList() {
  return {
    type: GET_CITY_LIST,
    service: getCityListService,
  };
}

export function getOrderConfig(params) {
  return {
    type: GET_ORDER_CONFIG,
    service: getOrderConfigService,
    params,
  };
}

export function updateOrderConfigMap(payload) {
  return {
    type: UPDATE_ORDER_CONFIG_MAP,
    payload,
  };
}

export function getOrderList(params) {
  return {
    type: GET_ORDER_LIST,
    service: getOrderListService,
    params,
  };
}

export function downloadOrderList(params) {
  return {
    type: DOWNLOAD_ORDER_LIST,
    service: downloadOrderListService,
    params,
  };
}
