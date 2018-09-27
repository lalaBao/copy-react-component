/*
 * MessagerManageReducer
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
import moment from 'moment';

import { FATCH_ACTION_SUCCESS_PREFIX, PER_PAGE } from 'utils/constants';

import {
  GET_CITY_LIST,
  GET_ORDER_LIST,
  GET_ORDER_CONFIG,
  UPDATE_SEARCH_CONDITION,
  UPDATE_ORDER_CONFIG_MAP,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  searchCondition: {
    start_date: moment().subtract(1, 'days').format('YYYYMMDD'),
    end_date: moment().subtract(1, 'days').format('YYYYMMDD'),
    city_id: 0,
    order_type: 0,
    quota_type_list: '0',
    page: 1,
    perpage: PER_PAGE,
  },
  cityMap: {},
  orderList: [],
  orderConfig: {},
  orderConfigMap: {},
  pagination: {
    total: 0,
    page: 1,
    perpage: PER_PAGE,
  },
});

function Reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SEARCH_CONDITION:
      return state
        .set('searchCondition', fromJS(action.payload));

    case UPDATE_ORDER_CONFIG_MAP:
      return state
        .set('orderConfigMap', fromJS(action.payload));

    case `${FATCH_ACTION_SUCCESS_PREFIX}${GET_CITY_LIST}`:
      return state
        .set('cityMap', fromJS(action.payload.data));

    case `${FATCH_ACTION_SUCCESS_PREFIX}${GET_ORDER_LIST}`:
      return state
        .set('orderList', fromJS(action.payload.data.list))
        .setIn(['pagination', 'total'], action.payload.data.total)
        .setIn(['pagination', 'page'], action.payload.data.page);

    case `${FATCH_ACTION_SUCCESS_PREFIX}${GET_ORDER_CONFIG}`:
      return state
        .set('orderConfig', fromJS(action.payload.data));

    default:
      return state;
  }
}

export default Reducer;
