import React from 'react';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import messages from '../../messages';

import NAMESPACE from './namespace';
import reducer from './reducer';
import saga from './saga';

import Toolbar from './Toolbar';
import DataTable from './DataTable';

export class OrderDataPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
  }

  render() {
    const { intl } = this.props;

    return (
      <article>
        <Helmet>
          <title>{intl.formatMessage(messages.moudle_f.header.title)}</title>
          <meta name="description" content={intl.formatMessage(messages.moudle_f.header.content)} />
        </Helmet>
        <div>
          <Toolbar />
          <DataTable />
        </div>
      </article>
    );
  }
}

OrderDataPage.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({ key: NAMESPACE, reducer });
const withSaga = injectSaga({ key: NAMESPACE, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(injectIntl(OrderDataPage));
