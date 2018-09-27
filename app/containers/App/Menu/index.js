import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { replace } from 'react-router-redux';
import { ACTION_ROOT } from 'utils/constants';
import config from 'utils/menu.config';
import './menuStyle.css';
import menuNesting from './helper';
import { makeSelectMenuSelectedKeys, makeSelectMenuOpenKeys, makeSelectLoginUserAuthList } from '../selectors';

class G2CMenu extends React.Component {
  handleClick = ({ keyPath }) => {
    const path = [...keyPath];
    path.reverse();
    path.unshift(ACTION_ROOT);
    this.props.changeLocation({
      pathname: `/${path.join('/')}`,
    });
  }
  render() {
    const { selectedKeys, openKeys, authList } = this.props;
    const Style = {
      color: '#fff',
      backgroundColor: '#242d32',
      overflowY: 'auto',
      overflowX: 'hidden',
      height: '100%',
      paddingBottom: '110px',
    };

    return (
      <Menu
        selectedKeys={selectedKeys}
        style={Style}
        className={'ant-menu'}
        onClick={this.handleClick}
        defaultSelectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        mode="inline"
      >
        { menuNesting(config, authList) }
      </Menu>
    );
  }
}

G2CMenu.propTypes = {
  selectedKeys: PropTypes.array.isRequired,
  authList: PropTypes.array.isRequired,
  changeLocation: PropTypes.func.isRequired,
  openKeys: PropTypes.array.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    changeLocation: (data) => dispatch(replace(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  selectedKeys: makeSelectMenuSelectedKeys(),
  openKeys: makeSelectMenuOpenKeys(),
  authList: makeSelectLoginUserAuthList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(G2CMenu);
