import { getRequest } from 'utils/request';

export const getCityListService = (params) => getRequest('/common/getopencitylist', params);
export const getDownloadListService = () => getRequest('/common/getdownloadlist');

// 消息管理
export const getOrderListService = (params) => getRequest('/data/statistics/getbusinessdata', params);
export const getOrderConfigService = () => getRequest('/data/statistics/getbusinessconfig');
export const getCarListService = (params) => getRequest('/data/statistics/getdriverdata', params);
export const getCarConfigService = () => getRequest('/data/statistics/getdriverconfig');
export const downloadOrderListService = (params) => getRequest('/data/statistics/downloadbusinessdata', params);
export const downloadDriverListService = (params) => getRequest('/data/statistics/downloaddriverdata', params);

// 司机注册
// 司机引入数据统计（获取表格数据）
export const getDriverListService = (params) => getRequest('/data/driver/driverintroducesummary', params);

// 邀请统计
// 邀请统计数据（获取邀请统计表格数据）
export const getInviteListService = (params) => getRequest('/data/driver/driverinvitesummary', params);
// 邀请明细 （弹框中表格数据）
export const getDetailListService = (params) => getRequest('/data/driver/driverintroducelist', params);

