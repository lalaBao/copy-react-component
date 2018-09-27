/**
 * DriverManage selectors
 */

import { createSelector } from 'reselect';
import NAMESPACE from './namespace';

const selectOrderData = (state) => state.get(NAMESPACE);

const selectCityMap = () => createSelector(
  selectOrderData,
  (subState) => subState.get('cityMap').toJS()
);

const makeSelectSearchCondition = () => createSelector(
  selectOrderData,
  (subState) => subState.get('searchCondition').toJS()
);

const makeOrderList = () => createSelector(
  selectOrderData,
  (subState) => subState.get('orderList').toJS()
);

const makeOrderConfig = () => createSelector(
  selectOrderData,
  (subState) => subState.get('orderConfig').toJS()
);

const makeSelectOrderConfigMap = () => createSelector(
  selectOrderData,
  (subState) => subState.get('orderConfigMap').toJS()
);

const makeSelectPagination = () => createSelector(
  selectOrderData,
  (subState) => subState.get('pagination').toJS()
);

export {
  makeOrderList,
  makeOrderConfig,
  selectCityMap,
  makeSelectSearchCondition,
  makeSelectOrderConfigMap,
  makeSelectPagination,
};
