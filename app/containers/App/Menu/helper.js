import React from 'react';
import { Menu, Icon } from 'antd';

import { checkAuth } from 'containers/AuthControl';

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

function menuNesting(menuConfig, authList) {
  const items = menuConfig.map((item) => {
    if (item.children && item.visibilityChild !== 'hidden') {
      const childrenNodes = menuNesting(item.children, authList);
      if (childrenNodes.filter((node) => node).length) { // 若子节点为空，那么父节点不应该显示
        return (
          checkAuth(item.auth, authList)(
            <SubMenu key={item.key} title={<span><Icon type={item.icon} />{item.text}</span>}>
              {childrenNodes}
            </SubMenu>
          )
        );
      }
      return '';
    }
    return (
      checkAuth(item.auth, authList)(
        <Item key={item.key}><Icon type={item.icon}></Icon>{item.text}</Item>
      )
    );
  });
  return items;
}

export default menuNesting;
