/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import 'antd/dist/antd.less';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, Menu as AntMenu, Dropdown, Icon, Avatar } from 'antd';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import injectSaga from 'utils/injectSaga';
import { ACTION_ROOT } from 'utils/constants';

import Crumb from 'components/Crumb';
// import LoginStatus from 'containers/Login/LoginStatus';

import HomePage from 'containers/HomePage/Loadable';
import UserManage from 'containers/SystemManage/SubPages/UserManage/Loadable';
import AuthManage from 'containers/SystemManage/SubPages/AuthManage/Loadable';
import AuthGroupManage from 'containers/SystemManage/SubPages/AuthGroupManage/Loadable';
import DriverManage from 'containers/DriverManage/SubPages/DriverManage/Loadable';
import DriverDetailPage from 'containers/DriverManage/SubPages/DriverManage/driverdetail/Loadable';
import DriverAccountPage from 'containers/DriverManage/SubPages/DriverManage/account/Loadable';

import BillManage from 'containers/ShopManage/SubPages/BillManage/Loadable';
import BillDetail from 'containers/ShopManage/SubPages/BillDetail/Loadable';
import OrderManage from 'containers/OrderManage/SubPages/OrderManage/Loadable';
import OrderDispatch from 'containers/OrderManage/SubPages/OrderDispatch/Loadable';
import OrderDetailPage from 'containers/OrderManage/SubPages/OrderDispatch/OrderDetailPage/Loadable';
import PackageManage from 'containers/PackageManage/SubPages/PackageManage/Loadable';
import MessageManage from 'containers/MessageManage/SubPages/MessageManage/Loadable';
import Adjustment from 'containers/Settlement/SubPages/Adjustment/Loadable';
import WithdrawDeposit from 'containers/Settlement/SubPages/WithdrawDeposit/Loadable';
import DriverData from 'containers/DataBackend/SubPages/DriverData/Loadable';
import OrderData from 'containers/DataBackend/SubPages/OrderData/Loadable';
import DriverRegister from 'containers/DataBackend/SubPages/DriverRegister/Loadable';
import InviteStatistics from 'containers/DataBackend/SubPages/InviteStatistics/Loadable';
import DriverDetail from 'containers/DataBackend/SubPages/DriverDetail/Loadable';
import CityManage from 'containers/CityManage/SubPages/CityManage/Loadable';
import AdviceFeedback from 'containers/AdviceFeedback/SubPages/AdviceFeedback/Loadable';
import ActivityManage from 'containers/Activity/SubPages/ActivityManage/Loadable';

import CrumbTest from 'containers/CrumbTest/Loadable';
import logo from '../../../static/images/logo.png';

import saga from './saga';
import DownloadListModal from './DownloadListModal';
import Menu from './Menu';
import { updateDownloadList, getLoginUserInfo } from './actions';
import { makeSelectRoute, makeSelectCurrentUserInfo, makeSelectNameMap } from './selectors';
import messages from './messages';


const AppWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
`;
const SideBar = styled.div`
  height: 100%;
  position: fixed;
  width: 200px;
  background: #242d32;
`;
const Logo = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 50px;
  height: 50px;
  color: #fff;
  background: #367c73;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;
const Content = styled.div`
  width: calc(100% - 200px);
  margin-left: 200px;
  min-height: calc(100%);
  background-color: #E5E5E5;
  position: relative;
  overflow: auto;
  font-size: 12px;
`;
const HeaderBar = styled.div`
  height: 50px;
  background: #409388;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
`;
const MainContent = styled.div`
  padding: 0 10px 10px 10px;
`;
const SideHead = styled.div`
  height: 55px;
  font-szie: 18px;
  color: #fff;
  text-align: center;
  vertical-align: middle;
  background-color: #3d6862;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 200px;
`;

const reg = new RegExp('(/login|/resetpwd|/editpwd|/bindphone)');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleShowDownloadList = this.handleShowDownloadList.bind(this);
    // this.handleShowDownloadList = () => {
    //     this.props.updateDownloadList({
    //         show: true,
    //         data: [],
    //     });
    // };
    this.handleDropdown = this.handleDropdown.bind(this);
    this.menu = (
          <AntMenu onClick={this.handleDropdown}>
              <AntMenu.Item key="logout"><FormattedMessage {...messages.logout} /></AntMenu.Item>
              <AntMenu.Item key="editpwd"><FormattedMessage {...messages.editPwd} /></AntMenu.Item>
              <AntMenu.Item key="bindphone"><FormattedMessage {...messages.bindPhone} /></AntMenu.Item>
          </AntMenu>
      );
  }
  componentWillMount() {
    const { route } = this.props;
    if (!reg.test(route.pathname)) {
      this.props.getLoginUserInfo();
    }
  }
  handleShowDownloadList() {
    this.props.updateDownloadList({
      show: true,
      data: [],
    });
  };
  handleDropdown(key) {
    if (key === 'logout') {
      window.location.href = '/static/pass.html#/logout';
    }
    if (key === 'editpwd') {
      window.location.href = '/static/pass.html#/editpwd';
    }
    if (key === 'bindphone') {
      window.location.href = '/static/pass.html#/bindphone';
    }
  };
  // menu = (
  //   <AntMenu onClick={this.handleDropdown}>
  //     <AntMenu.Item key="logout"><FormattedMessage {...messages.logout} /></AntMenu.Item>
  //     <AntMenu.Item key="editpwd"><FormattedMessage {...messages.editPwd} /></AntMenu.Item>
  //     <AntMenu.Item key="bindphone"><FormattedMessage {...messages.bindPhone} /></AntMenu.Item>
  //   </AntMenu>
  // );
  render() {
    const { currentUserInfo, route, nameMap } = this.props;
    // if (reg.test(route.pathname)) {
    //   return (
    //     <div>
    //       <Route path={`/${ACTION_ROOT}/login`} key="login" component={LoginStatus} />
    //     </div>
    //   );
    // }
    return (
      <div>
        <Helmet
          titleTemplate="%s - CAT"
          defaultTitle="CAT"
        >
          <meta name="description" content="CAT" />
        </Helmet>
        <AppWrapper>
          <SideBar>
            <Logo>
              <img alt={'风驰顺行'} src={logo} width={'150px'} height={'50px'}></img>
            </Logo>
            <Menu />
            <SideHead>
              <Avatar shape="square" size="medium" icon="user" style={{ backgroundColor: '#f0f0f0', color: '#559188', marginRight: 10 }} />
              <div><div>{currentUserInfo.chinesename}</div><div>{currentUserInfo.phone}</div></div>
            </SideHead>
          </SideBar>
          <Content>
            <HeaderBar>
              <Button type="primary" shape="circle" size="small" icon="download" onClick={this.handleShowDownloadList} />
              <Dropdown overlay={this.menu}>
                <button className="ant-dropdown-link">
                  <Icon type="user" style={{ fontSize: 24, color: '#fff', marginRight: 5, cursor: 'pointer' }} />
                </button>
              </Dropdown>
              <DownloadListModal />
            </HeaderBar>
            <Crumb
              route={route}
              nameMap={nameMap}
            />
            <MainContent>
              <Route path={`/${ACTION_ROOT}/homepage`} key="homepage" component={HomePage} />
              <Route path={`/${ACTION_ROOT}/system/usermanage`} key="usermanage" component={UserManage} />
              <Route exact path={`/${ACTION_ROOT}/system/authmanage`} key="authmanage" component={AuthManage} />
              <Route path={`/${ACTION_ROOT}/system/authmanage/test`} key="test" component={CrumbTest} />
              <Route path={`/${ACTION_ROOT}/system/authgroupmanage`} key="authgroupmanage" component={AuthGroupManage} />
              <Route path={`/${ACTION_ROOT}/carowner/drivermanage`} key="drivermanage" component={DriverManage} />
              <Route path={`/${ACTION_ROOT}/carowner/drivermanage/driverdetailpage`} key="drivermanage/driverdetailpage" component={DriverDetailPage} />
              <Route path={`/${ACTION_ROOT}/carowner/drivermanage/driveraccountpage`} key="drivermanage/driveraccountpage" component={DriverAccountPage} />

              <Route path={`/${ACTION_ROOT}/order/ordermanage`} key="ordermanage" component={OrderManage} />
              <Route path={`/${ACTION_ROOT}/order/ordermanage/orderdetailpage`} key="ordermanage/orderdetailpage" component={OrderDetailPage} />
              <Route path={`/${ACTION_ROOT}/order/orderdispatch`} key="orderdispatch" component={OrderDispatch} />
              <Route path={`/${ACTION_ROOT}/order/orderdispatch/orderdetailpage`} key="orderdispatch/orderdetailpage" component={OrderDetailPage} />
              <Route path={`/${ACTION_ROOT}/order/packagemanage`} key="packagemanage" component={PackageManage} />
              <Route path={`/${ACTION_ROOT}/activity/messagemanage`} key="messagemanage" component={MessageManage} />
              <Route path={`/${ACTION_ROOT}/settlement/billmanage`} key="billmanage" component={BillManage} />
              <Route path={`/${ACTION_ROOT}/settlement/billdetail`} key="billdetail" component={BillDetail} />
              <Route path={`/${ACTION_ROOT}/settlement/adjustment`} key="adjustment" component={Adjustment} />
              <Route path={`/${ACTION_ROOT}/settlement/withdrawdeposit`} key="withdrawdeposit" component={WithdrawDeposit} />
              <Route path={`/${ACTION_ROOT}/databe/driverdata`} key="driverdata" component={DriverData} />
              <Route path={`/${ACTION_ROOT}/databe/orderdata`} key="orderdata" component={OrderData} />
              <Route path={`/${ACTION_ROOT}/databe/driverregister`} key="driverregister" component={DriverRegister} />
              <Route path={`/${ACTION_ROOT}/databe/invitestatistics`} key="invitestatistics" component={InviteStatistics} />
              <Route path={`/${ACTION_ROOT}/databe/driverdetail`} key="driverdetail" component={DriverDetail} />
              <Route path={`/${ACTION_ROOT}/activity/citymanage`} key="citymanage" component={CityManage} />
              <Route path={`/${ACTION_ROOT}/activity/advicefeedback`} key="advicefeedback" component={AdviceFeedback} />
              <Route path={`/${ACTION_ROOT}/activity/activitymanage`} key="activitymanage" component={ActivityManage} />
            </MainContent>
          </Content>
        </AppWrapper>
      </div>
    );
  }
}

App.propTypes = {
  updateDownloadList: PropTypes.func.isRequired,
  getLoginUserInfo: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
  nameMap: PropTypes.object.isRequired,
  currentUserInfo: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    updateDownloadList: (data) => dispatch(updateDownloadList(data)),
    getLoginUserInfo: () => dispatch(getLoginUserInfo()),
  };
}

const mapStateToProps = createStructuredSelector({
  route: makeSelectRoute(),
  currentUserInfo: makeSelectCurrentUserInfo(),
  nameMap: makeSelectNameMap(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'main', saga });

export default compose(
  withSaga,
  withConnect,
)(App);
