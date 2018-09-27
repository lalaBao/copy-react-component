import React from 'react';
import PropTypes from 'prop-types';

import { Table, Tooltip, Button } from 'antd';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TableContainer from 'components/TableContainer';

import messages from '../../messages';
import '../../../Common/Iconfont/iconfont.css';

import { getOrderList } from './actions';
import {
  makeOrderList,
  makeSelectPagination,
  selectCityMap,
  makeSelectSearchCondition,
  makeSelectOrderConfigMap,
} from './selectors';

class DataTable extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    scrollY: 0,
  }
  setScrollY = (scrollY) => {
    this.setState({
      scrollY,
    });
  }
  getSrollX() {
    const { orderList } = this.props;
    if (orderList[0] && Object.keys(orderList[0]).length > 7) {
      return Object.keys(orderList[0]).length * 180;
    }
    return undefined;
  }
  handlePageChange = (page, pageSize) => {
    const { searchCondition } = this.props;
    this.props.getOrderList({
      ...searchCondition,
      page,
      perpage: pageSize,
    });
  };
  showTotal(total) {
    return `总共 ${total} 条`;
  }
  makeColumns() {
    const { orderList, cityMap, intl } = this.props;
    let { orderConfigMap } = this.props;
    orderConfigMap = {
      ...orderConfigMap,
      city_id: {
        title: '城市',
        unit: '',
        definition: '',
      },
    };
    const orderListItem = orderList[0];
    const columns = [];
    // eslint-disable-next-line
    orderListItem && Object.keys(orderListItem).forEach((item) => {
      if (orderConfigMap[item]) {
        columns.push({
          title: item === 'city_id' ? orderConfigMap[item].title : <Tooltip placement="top" title={orderConfigMap[item].definition}><i className="iconfont icon-info" style={ { marginRight: '8px', fontSize: '14px' } } ></i>{orderConfigMap[item].title}</Tooltip>,
          dataIndex: item,
          key: item,
          // fixed: item === 'city_id' ? 'left' : '',
          width: item === 'city_id' ? '' : 180,
          align: 'center',
          render: (value) => {
            if (item === 'city_id') {
              return value === 0 ?
                <Button type="primary">{intl.formatMessage(messages.databackend.all)}</Button> : cityMap[value];
            }
            return value + orderConfigMap[item].unit;
          },
        });
      }
    });
    let cityItem = '';// 保证城市在第一列显示
    // eslint-disable-next-line
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].key === 'city_id') {
        cityItem = columns.splice(i, 1)[0];
      }
    }
    // eslint-disable-next-line
    cityItem && columns.unshift(cityItem);
    return columns;
  }
  render() {
    const { orderList, pagination } = this.props;

    return (
      <TableContainer setScrollY={this.setScrollY}>
        <Table
          ref={this.myRef}
          bordered
          columns={this.makeColumns()}
          dataSource={orderList}
          rowKey="city_id"
          scroll={ { x: this.getSrollX(), y: this.state.scrollY } }
          pagination={ {
            defaultCurrent: 1,
            current: Number(pagination.page),
            total: Number(pagination.total),
            pageSize: pagination.perpage,
            showTotal: this.showTotal,
            onChange: this.handlePageChange,
          } }
        />
      </TableContainer>
    );
  }
}

DataTable.propTypes = {
  intl: intlShape.isRequired,
  orderList: PropTypes.array.isRequired,
  orderConfigMap: PropTypes.object.isRequired,
  cityMap: PropTypes.object.isRequired,
  searchCondition: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  getOrderList: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    getOrderList: (data) => dispatch(getOrderList(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  orderList: makeOrderList(),
  orderConfigMap: makeSelectOrderConfigMap(),
  cityMap: selectCityMap(),
  searchCondition: makeSelectSearchCondition(),
  pagination: makeSelectPagination(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(injectIntl(DataTable));
