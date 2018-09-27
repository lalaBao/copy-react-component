/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { repoLoadingError } from 'containers/App/actions';
import { FATCH_ACTION_SUCCESS_PREFIX } from 'utils/constants';

import { updateOrderConfigMap } from './actions';
import {
  GET_ORDER_CONFIG,
} from './constants';

export function* getOrderConfigSuccess(data) {
  try {
    const orderConfig = data.payload.data;
    let orderConfigMap = {};
    let item = {};
    Object.keys(orderConfig).forEach((key) => {
      item = orderConfig[key];
      // eslint-disable-next-line
      for (let i = 0; i < item.list.length; i++) {
        orderConfigMap = {
          ...orderConfigMap,
          [item.list[i].value]: {
            title: item.list[i].label,
            unit: item.list[i].unit,
            definition: item.list[i].definition,
          },
        };
      }
    });
    yield put(updateOrderConfigMap(orderConfigMap));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export function* watcher(type, process) {
  yield takeLatest(type, process);
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield [
    call(() => watcher(`${FATCH_ACTION_SUCCESS_PREFIX}${GET_ORDER_CONFIG}`, getOrderConfigSuccess)),
  ];
}
