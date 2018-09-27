/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectRoute = () => createSelector(
  selectRoute,
  (subState) => subState.get('location').toJS()
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectDownloadModalVisible = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['downloadListModal', 'show'])
);

const makeSelectDownloadModalData = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['downloadListModal', 'data']).toJS()
);

const makeSelectMenuSelectedKeys = () => createSelector(
  selectRoute,
  (subState) => {
    const path = subState.getIn(['location', 'pathname']);
    return path.split('/').filter((item) => item);
  }
);

const makeSelectMenuOpenKeys = () => createSelector(
  selectRoute,
  (subState) => {
    const path = subState.getIn(['location', 'pathname']);
    return path.split('/').filter((item, index) => (item && index !== path.length - 1));
  }
);

const makeSelectLoginUserAuthList = () => createSelector(
  selectGlobal,
  (subState) => subState.get('authList').toJS()
);

const makeSelectLoginUserRegion = () => createSelector(
  selectGlobal,
  (subState) => subState.get('region').toJS()
);

const makeSelectCurrentUserInfo = () => createSelector(
  selectGlobal,
  (subState) => subState.get('currentUser').toJS()
);

const makeSelectPlatformAuth = () => createSelector(
  selectGlobal,
  (subState) => subState.get('platformAuth')
);

const makeSelectNameMap = () => createSelector(
  selectGlobal,
  (subState) => subState.get('nameMap').toJS()
);

export {
  selectGlobal,
  selectRoute,
  makeSelectLoading,
  makeSelectError,
  makeSelectDownloadModalVisible,
  makeSelectDownloadModalData,
  makeSelectMenuSelectedKeys,
  makeSelectMenuOpenKeys,
  makeSelectLoginUserAuthList,
  makeSelectCurrentUserInfo,
  makeSelectPlatformAuth,
  makeSelectRoute,
  makeSelectNameMap,
  makeSelectLoginUserRegion,
};
