const menu = [{
  key: 'homepage',
  icon: 'home',
  text: '首页',
}, {
  key: 'system',
  text: '系统管理',
  icon: 'setting',
  children: [{
    key: 'usermanage',
    text: '用户管理',
    auth: 10000000,
  }, {
    key: 'authmanage',
    text: '权限管理',
    auth: 10000001,
  }, {
    key: 'authgroupmanage',
    text: '权限组管理',
    auth: 10000002,
  }],
}, {
  key: 'carowner',
  text: '运力管理',
  icon: 'idcard',
  children: [{
    key: 'drivermanage',
    text: '司机管理',
    auth: 10000003,
    visibilityChild: 'hidden',
    children: [{
      key: 'driverdetailpage',
      text: '司机信息',
      auth: 10000003,
    }, {
      key: 'driveraccountpage',
      text: '账户明细',
      auth: 10000003,
    }],
  }],
}, {
  key: 'order',
  text: '运单管理',
  icon: 'profile',
  children: [{
    key: 'orderdispatch',
    text: '运单调度',
    auth: 10000007,
    visibilityChild: 'hidden',
    children: [{
      key: 'orderdetailpage',
      text: '运单详情',
      auth: 10000007,
    }],
  }, {
    key: 'ordermanage',
    text: '运单管理',
    auth: 10000007,
  }, {
    key: 'packagemanage',
    text: '标书管理',
    auth: 10000006,
  }],
}, {
  key: 'settlement',
  text: '结算管理',
  icon: 'pay-circle-o',
  children: [{
    key: 'adjustment',
    text: '余额调整',
    auth: 10000009,
  }, {
    key: 'billmanage',
    text: '账单管理',
    auth: 10000008,
  }, {
    key: 'withdrawdeposit',
    text: '保证金提现',
    auth: 10000008,
  }],
}, {
  key: 'databe',
  text: '数据后台',
  icon: 'area-chart',
  auth: 10000011,
  children: [{
    key: 'orderdata',
    text: '运单数据',
    auth: 10000011,
  }, {
    key: 'driverdata',
    text: '司机数据',
    auth: 10000011,
  }, {
    key: 'driverregister',
    text: '司机转化统计',
    auth: 10000011,
  }, {
    key: 'invitestatistics',
    text: '司机拉新统计',
    auth: 10000011,
  }, {
    key: 'driverdetail',
    text: '司机转化明细',
    auth: 10000011,
  }],
}, {
  key: 'activity',
  text: '运营管理',
  icon: 'gift',
  auth: 10000000,
  children: [{
    key: 'citymanage',
    text: '城市管理',
    auth: 10000012,
  }, {
    key: 'activitymanage',
    text: '运营活动',
    auth: 10000014,
  }, {
    key: 'messagemanage',
    text: '消息中心',
    auth: 10000005,
  }, {
    key: 'advicefeedback',
    text: '意见反馈',
    auth: 10000000,
  }],
}];

export default menu;

function traverseArray(arr) {
  let obj = {};
  arr.forEach((item) => {
    obj[item.key] = {
      text: item.text,
      isLeaf: !item.children,
    };
    if (item.children) {
      obj = {
        ...obj,
        ...traverseArray(item.children),
      };
    }
  });
  return obj;
}

export const menuMap = traverseArray(menu);
