
/**
 * 常用工具函数（ES6语法）
 * cookie
 * url params
 * date
 * time
 * 身份证校验
 * more……
 * 此文件中的函数需注明作者
 */

const Utils = {};

/**
 * [设置cookie]
 * @param {[string]} cookie key
 * @param {[string]} cookie value
 * @author lichun
 */
Utils.setCookie = (name, value) => {
  const now = new Date();
  now.setDate(now.getDate() + (1000 * 60 * 60 * 24 * 30));
  const str = `${name}=${value};expires=${now.toGMTString()};path=/;`;
  document.cookie = str;
};

/**
 * [得到cookie]
 * @param {[string]} cookie key
 * @returns {[string]} value
 * @author lichun
 */
Utils.getCookie = (name) => {
  let start;
  let end;

  if (document.cookie.length > 0) {
    start = document.cookie.indexOf(`${name}=`);

    if (start !== -1) {
      start = start + name.length + 1;
      end = document.cookie.indexOf(';', start);
      if (end === -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(start, end));
    }
  }
  return '';
};

/**
 * 从url中获取参数值
 * @param {string} 参数名
 * @return {string} 参数值
 * @author lichun 正则自己写的，不保证所有情况下都正确 ^-^ 凑合着用
 */
Utils.getQueryString = (name) => {
  const reg = new RegExp(`([?&])${name}=([^&]*?)(#|&|$)`, 'i');
  const r = window.location.href.match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return '';
};

/**
* 从url中获取所有参数
* @author lichun 正则自己写的，不保证所有情况下都正确 ^-^ 凑合着用
*/
Utils.getAllQueryString = () => {
  const reg = new RegExp('[?|&|^]([\\w-_]*?)=([\\w-_]*)', 'g');
  const str = window.location.href;
  const query = {};

  let result = reg.exec(str);
  while (result != null) {
    query[result[1]] = result[2];
    result = reg.exec(str);
  }
  return query;
};

/**
 * [contains 判断数组是否包含值]
 * @param  {[type]} a [主数组]
 * @param  {[type]} b [值]
 * @return {[type]}   [a 包含 b 返回true]
 * @author lichun
 */
Utils.contains = (a, b) => {
  // eslint-disable-next-line
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b) {
      return true;
    }
  }
  return false;
};

/**
 * [日期转化工具]
 * @param  {[date]} dateobj [日期对象]
 * @param  {[string]} format [转化格式 yyyy-MM-dd hh:mm:ss]
 * @return {[string]}
 * @author lichun
 */
Utils.formatDate = (dateobj, format = 'yyyy-MM-dd hh:mm:ss') => {
  const date = {
    'M+': dateobj.getMonth() + 1,
    'd+': dateobj.getDate(),
    'h+': dateobj.getHours(),
    'm+': dateobj.getMinutes(),
    's+': dateobj.getSeconds(),
    'q+': Math.floor((dateobj.getMonth() + 3) / 3),
    'S+': dateobj.getMilliseconds(),
  };
  if (/(y+)/i.test(format)) {
    // eslint-disable-next-line
    format = format.replace(RegExp.$1, (`${dateobj.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  // eslint-disable-next-line
  for (let k in date) {
    if (new RegExp(`(${k})`).test(format)) {
      // eslint-disable-next-line
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
            ? date[k] : (`00${date[k]}`).substr((`${date[k]}`).length));
    }
  }
  return format;
};

/**
 * 秒数时间戳转换成HH:mm:ss
 * @example 1 => 00:00:01
 * @param {[number]} 从零点开始的秒数
 * @return {[string]} 时分秒格式
 * @author lichun
 */
Utils.secondToTime = (second) => {
  if (/\d{2}(:\d{2}){1,2}/.test(second)) {
    return second;
  }
  const hours = Math.floor(second / 3600) || 0;
  const mins = Math.floor((second / 60) % 60) || 0;
  const secs = Math.floor(second - (hours * 3600) - (mins * 60)) || 0;
  // eslint-disable-next-line
  return ('0' + hours).slice(-2) + ":" +('0' + mins).slice(-2) + ":" + ('0'+secs).slice(-2);
};

/**
 * HH:mm:ss转换为秒数
 * @example 00:00:01 => 1
 * @author lichun
 */
Utils.timeToSecond = (time) => {
  const timeArray = time.split(':');
  const hourSecond = timeArray[0] ? (Number(timeArray[0]) * 3600) : 0;
  const minuteSecond = timeArray[1] ? (Number(timeArray[1]) * 60) : 0;
  const second = Number(timeArray[2]) || 0;
  return hourSecond + minuteSecond + second;
};

/**
 * 毫秒转换为秒数
 * @example 123456789 => 123456
 * @author lichun
 */
Utils.millisecondToSecond = (time) => {
  return parseInt(time / 1000);
};

/**
 * [过滤对象falsy的值]
 * @param  obj [对象]
 * @return {[obj]}
 * @author lichun
 */
Utils.convertObject = (obj) => {
  const newObj = {};
  const keys = Object.keys(obj);
  // eslint-disable-next-line
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

/**
 * 检验18位身份证号码
 * @param cid 18为的身份证号码
 * @return Boolean 是否合法
 * @author lichun
 */
Utils.validIDCard = (cid) => {
  const arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const arrValid = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
  if (/^\d{17}\d|x$/i.test(cid)) {
    let sum = 0;

    // eslint-disable-next-line
    for (let i = 0; i < cid.length - 1; i++) {
      // 对前17位数字与权值乘积求和
      sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
    }
    // 计算模（固定算法）
    const idx = sum % 11;
    // 检验第18为是否与校验码相等
    return `${arrValid[idx]}` === cid.substr(17, 1).toUpperCase();
  }
  return false;
};

/**
 * 根据身份证号码计算年龄，直接年份减；
 * @param {[string]} 身份证号码
 * @return {[number]} 年龄
 * @author lichun
 */
Utils.getAgeByIdCard = (idcard) => {
  if (!Utils.validIDCard(idcard)) {
    return null;
  }

  return (new Date()).getFullYear() - parseInt(idcard.substring(6, 10), 10);
};

/**
 * 检验邮箱地址
 * @param email 邮箱地址
 * @return Boolean 是否合法
 * @author yangyang
 */
Utils.validEmail = (email) => {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
};

/**
 * 检验手机号码
 * @param MobilePhoneNumber 手机号码
 * @return Boolean 是否合法
 * @author yangyang
 */
Utils.validMobilePhoneNumber = (MobilePhoneNumber) => {
  const reg = /^1(3|4|5|6|7|8|9)[0-9]\d{8}$/;
  return reg.test(MobilePhoneNumber);
};

/**
 * 检验电话号码
 * @param phoneNumber 电话号码，包含手机，座机，分机号码
 * @return Boolean 是否合法
 * @author yangyang
 */
Utils.validPhoneNumber = (phoneNumber) => {
  const isMobile = /^1(3|4|5|6|7|8|9)[0-9]\d{8}$/;
  const isPhone = /^(0\d{2,3}-?)?\d{7,8}$/;
  const isExt = /^[48]00-?\d{3}-?\d{4}$/;
  if (isMobile.test(phoneNumber)) {
    return true;
  }
  if (isPhone.test(phoneNumber)) {
    return true;
  }
  if (isExt.test(phoneNumber)) {
    return true;
  }
  return false;
};

/**
* 检验是否为中文字符
* @param tempString 姓名，地址,需要判断是否是中文的字符串
* @return Boolean 是否合法
* @author huangyaqi
*/
Utils.validIsChinese = (tempString) => {
  const isChinese = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
  if (isChinese.test(tempString)) {
    return true;
  }
  return false;
};

/**
 * 字符转换
 */
Utils.toUtf8 = (str) => {
  let out = '';
  const len = str.length;
  // eslint-disable-next-line
  for (let i = 0; i < len; i++) {
    const c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      // eslint-disable-next-line
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
      // eslint-disable-next-line
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
      // eslint-disable-next-line
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    } else {
      // eslint-disable-next-line
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
      // eslint-disable-next-line
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    }
  }
  return out;
};

/**
 * 美化日期
 * @param {String} date eg: 20170217
 * @return {String} 2017-02-17
 * @author maoyuyang
 */
Utils.beautifyDate = (date) => `${date.toString().substring(0, 4)}-${date.toString().substring(4, 6)}-${date.toString().substring(6, 8)}`;

/**
 * 检验是否为中文字符
 * @param tempString 姓名，地址,需要判断是否是中文的字符串
 * @return String 是否合法
 * @author yangyang
 */
Utils.fen2yuan = (num) => {
  if (typeof num !== 'number' || isNaN(num)) return null;
  let result = num / 100.0;
  result += '';
  const reg = result.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
  const res = result.replace(reg, '$1,');
  return `${res} 元`;
};

export default Utils;
