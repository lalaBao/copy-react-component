/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
import { FATCH_ACTION_PREFIX } from 'utils/constants';

export const LOAD_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const DEFAULT_LOCALE = 'en';
export const GET_DOWNLOAD_LIST = `${FATCH_ACTION_PREFIX}GET_DOWNLOAD_LIST`;
export const UPDATE_DOWNLOAD_LIST = 'UPDATE_DOWNLOAD_LIST';
export const UPDATE_PLATFORM_AUTH = 'UPDATE_PLATFORM_AUTH';
export const GET_LOGIN_USER_INFO = `${FATCH_ACTION_PREFIX}GET_LOGIN_USER_INFO`;
export const UPDATE_FIX = 'UPDATE_FIX';
