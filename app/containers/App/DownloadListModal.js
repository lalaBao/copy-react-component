import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import commonMessages from 'utils/commonMessages';
import DownloadItem from 'components/DownloadItem';

import messages from './messages';
import { makeSelectDownloadModalVisible, makeSelectDownloadModalData } from './selectors';
import { getDownloadList, updateDownloadList } from './actions';


class DownloadListModal extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.show === true && this.props.show === false) {
      this.props.getDownloadList();
    }
    let uncomplate = false;
    const { list } = nextProps;
    // eslint-disable-next-line
    for (let i = 0; i < list.length; i++) {
      if (list[i].status < 2) {
        uncomplate = true;
        break;
      }
    }
    if (uncomplate) {
      this.timer = setTimeout(() => this.props.getDownloadList(), 5000);
    }
    if ((!uncomplate || nextProps.show === false) && this.timer) {
      clearTimeout(this.timer);
    }
  }
  handleClose = () => {
    this.props.updateDownloadList({
      show: false,
      data: [],
    });
  }
  render() {
    const { intl, show, list } = this.props;

    return (
      <Modal
        title={intl.formatMessage(messages.downloadList)}
        visible={show}
        footer={<Button onClick={this.handleClose}><FormattedMessage {...commonMessages.close} /></Button>}
        onCancel={this.handleClose}
      >
        <ul>
          {
            list.map((item) => <DownloadItem key={item.create_time} data={item} />)
          }
        </ul>
      </Modal>
    );
  }
}

DownloadListModal.propTypes = {
  intl: intlShape.isRequired,
  show: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  getDownloadList: PropTypes.func.isRequired,
  updateDownloadList: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    getDownloadList: (data) => dispatch(getDownloadList(data)),
    updateDownloadList: (data) => dispatch(updateDownloadList(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  show: makeSelectDownloadModalVisible(),
  list: makeSelectDownloadModalData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(injectIntl(DownloadListModal));
