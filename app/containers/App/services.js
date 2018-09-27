import { getRequest } from 'utils/request';

export const getDownloadListService = () => getRequest('/common/getdownloadlist');
export const getLoginUserInfoService = () => getRequest('/user/basic/getuserauth');
