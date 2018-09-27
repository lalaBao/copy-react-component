export const ACTION_ROOT = 'page';
// action
export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const FATCH_ACTION_PREFIX = '@@FETCH_';
export const DOWNLOAD_ACTION_PREFIX = '@@FETCH_DOWNLOAD_';
export const FATCH_ACTION_SUCCESS_PREFIX = 'SUCCESS_';
export const FATCH_ACTION_ERROR_PREFIX = 'ERROR_';

// pagination
export const PER_PAGE = 20;

// operate constant
export const MODIFY = 'modify';
export const CREATE = 'create';
export const APPROVE = 'approve';
export const PUBLIC = 'public';
export const DELETE = 'delete';
export const CHECK = 'check';
export const DRAFT = 'draft';

// errno
export const USER_NOT_LOGIN_ERRNO = 110003; // 用户未登陆
export const USER_NOT_EXIST_ERRNO = 110018; // 用户不存在
