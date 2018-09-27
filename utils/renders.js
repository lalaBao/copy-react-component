import _ from 'lodash';
import Utils from 'utils/utils';

export const carLengthRender = (data) => {
  if (_.isArray(data) && data[1]) {
    return `${data[0]} x ${data[1]}`;
  }
  return data;
};

export const timestampRender = (unixtimestamp) => {
  if (unixtimestamp) {
    return Utils.formatDate(new Date(unixtimestamp * 1000));
  }
  return '-';
};

export const genderRender = (data) => {
  if (data === 1 || data === '1') {
    return '男';
  }
  if (data === 2 || data === '2') {
    return '女';
  }
  return data;
};
