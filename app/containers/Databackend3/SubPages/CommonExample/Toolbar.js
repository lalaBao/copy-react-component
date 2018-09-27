import React from 'react';
import PropTypes from 'prop-types';

import { Form, Row, Col, Button, Select, DatePicker, TreeSelect } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';

import ToolbarContainer from 'components/ToolbarContainer';
import commonMessages from 'utils/commonMessages';

import messages from '../../messages';
import {
  getCityList,
  getOrderList,
  getOrderConfig,
  updateSearchCondition,
  downloadOrderList,
} from './actions';

import { selectCityMap, makeOrderList, makeOrderConfig, makeSelectSearchCondition } from './selectors';

class Toolbar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    time: 0,
    orderConfig: {},
  }
  componentDidMount() {
    const { searchCondition } = this.props;
    this.props.getCityList();
    this.props.getOrderConfig();
    const initSearchCondition = {
      ...searchCondition,
      city_id: 0,
      order_type: 0,
      quota_type_list: '0',
      start_date: moment().subtract(1, 'days').format('YYYYMMDD'),
      end_date: moment().subtract(1, 'days').format('YYYYMMDD'),
    };
    this.props.updateSearchCondition(initSearchCondition);
    this.props.getOrderList(initSearchCondition);
  }
  getTreeSelectInitData() {
    const { orderConfig } = this.props;
    const { intl } = this.props;
    const treeData = [];
    Object.keys(orderConfig).forEach((key) => {
      treeData.push({
        title: orderConfig[key].name,
        value: orderConfig[key].value.toString(),
        key: orderConfig[key].value,
        // eslint-disable-next-line
        children: orderConfig[key].list.map((item) => {
          return {
            title: item.label,
            value: item.value.toString(),
            key: item.value,
          };
        }),
      });
    });
    const SHOW_PARENT = TreeSelect.SHOW_PARENT;
    const tProps = {
      treeData,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: intl.formatMessage(commonMessages.all),
    };
    return tProps;
  }
  getFields() {
    const { intl, cityList, searchCondition } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { RangePicker } = DatePicker;
    const children = [];
    const formItem = [{
      id: 'start_end_time',
      name: messages.databackend.date,
      type: 'rangePicker',
      initValue: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      data: this.disabledDate,
    }, {
      id: 'city_id',
      name: messages.databackend.city,
      data: cityList || {},
      type: 'select',
      initValue: searchCondition.city_id,
    }, {
      id: 'order_type',
      name: messages.databackend.order_type,
      data: messages.databackend.order_type_map,
      type: 'select',
      initValue: searchCondition.order_type,
    }];
    // eslint-disable-next-line
    for (let i = 0; i < formItem.length; i++) {
      children.push(
        <Col span={8} key={i} >
          <Form.Item label={intl.formatMessage(formItem[i].name)}>
            { getFieldDecorator(formItem[i].id, {
              initialValue: formItem[i].initValue,
            })(
              formItem[i].type === 'rangePicker' ?
                <RangePicker
                  allowClear={false}
                  ranges={ {
                    昨天: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    最近一周: [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
                    最近一月: [moment().subtract(30, 'days'), moment().subtract(1, 'days')] } }
                  placeholder={[intl.formatMessage(messages.databackend.start_date), intl.formatMessage(messages.databackend.end_date)]}
                  onChange={this.onChange}
                  format="YYYY-MM-DD"
                  disabledDate={formItem[i].data}
                /> : <Select
                  showSearch
                  optionFilterProp="children"
                >
                  <Select.Option value={0} >{intl.formatMessage(commonMessages.all)}</Select.Option>
                  {formItem[i] && formItem[i].data && Object.keys(formItem[i].data).map((key) => (
                    <Select.Option value={key} key={key}>
                      {formItem[i].data[key]}
                    </Select.Option>
                  ))}
                </Select>
              )
            }
          </Form.Item>
        </Col>
      );
    }
    return children;
  }
  getQuotaTypeList = () => {
    const { orderConfig } = this.props;
    const initQuotoTypeList = [];
    // eslint-disable-next-line
    Object.keys(orderConfig).length > 0 && Object.keys(orderConfig).forEach((key) => {
      initQuotoTypeList.push(key.toString());
    });
    return initQuotoTypeList;
  }
  handleDownloadDataTable = () => {
    this.props.form.validateFields((err, values) => {
      const searchCondition = {
        city_id: Number(values.city_id),
        order_type: Number(values.order_type),
        quota_type_list: values.quota_type_list === '0' ? '0' : values.quota_type_list.join(','),
        start_date: values.start_end_time[0].format('YYYYMMDD'),
        end_date: values.start_end_time[1].format('YYYYMMDD'),
      };
      this.props.downloadOrderList(searchCondition);
    });
  }
  disabledDate(current) {
    // Can not select days after yesterday
    return current && current > moment().subtract(1, 'days');
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const searchCondition = {
        city_id: Number(values.city_id),
        order_type: Number(values.order_type),
        quota_type_list: values.quota_type_list === '0' ? '0' : values.quota_type_list.join(','),
        start_date: values.start_end_time[0].format('YYYYMMDD'),
        end_date: values.start_end_time[1].format('YYYYMMDD'),
      };
      this.props.updateSearchCondition(searchCondition);
      this.props.getOrderList(searchCondition);
    });
  }

  render() {
    const { form, intl } = this.props;
    const { getFieldDecorator } = form;
    return (
      <ToolbarContainer>
        <Form
          onSubmit={this.handleSearch}
        >
          <Row gutter={24} >
            {this.getFields()}
          </Row>
          <Row gutter={24} >
            <Col>
              <Form.Item label={intl.formatMessage(messages.databackend.target_type)}>
                { getFieldDecorator('quota_type_list', {
                  initialValue: this.getQuotaTypeList(),
                  // initialValue: searchCondition.quota_type_list,
                })(
                  <TreeSelect {...this.getTreeSelectInitData()} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col style={ { textAlign: 'right' } }>
              <Button type="primary" htmlType="submit" icon="search" style={ { marginRight: 10 } }><FormattedMessage {...messages.databackend.check} /></Button>
              <Button type="primary" onClick={this.handleDownloadDataTable}><FormattedMessage {...commonMessages.download} /></Button>
            </Col>
          </Row>
        </Form>
      </ToolbarContainer>
    );
  }
}

Toolbar.propTypes = {
  intl: intlShape.isRequired,
  form: PropTypes.any.isRequired,
  cityList: PropTypes.object.isRequired,
  searchCondition: PropTypes.object.isRequired,
  orderConfig: PropTypes.object.isRequired,
  getCityList: PropTypes.func.isRequired,
  getOrderConfig: PropTypes.func.isRequired,
  getOrderList: PropTypes.func.isRequired,
  updateSearchCondition: PropTypes.func.isRequired,
  downloadOrderList: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    getCityList: () => dispatch(getCityList()),
    getOrderList: (data) => dispatch(getOrderList(data)),
    getOrderConfig: () => dispatch(getOrderConfig()),
    updateSearchCondition: (data) => dispatch(updateSearchCondition(data)),
    downloadOrderList: (data) => dispatch(downloadOrderList(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  cityList: selectCityMap(),
  searchCondition: makeSelectSearchCondition(),
  orderList: makeOrderList(),
  orderConfig: makeOrderConfig(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Form.create()(injectIntl(Toolbar)));
