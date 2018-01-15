import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import { makeSelectUsername } from './selectors';
import HandleUsername from './handleUsername';

import ReposList from 'components/ReposList';
import H2 from 'components/H2';

import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';

import reducer from './reducer';
import saga from './saga';

export class HomePage extends React.PureComponent {
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }
  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };
    return (
      <div>
        <H2>
          <FormattedMessage {...messages.startProjectHeader} />
        </H2>
        <HandleUsername onChange={this.props.onChangeUsername} />
        <ReposList {...reposListProps} />
      </div>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => {
      dispatch(changeUsername(evt.target.value));
      dispatch(loadRepos());
    },
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // dispatch 一个 action 为 loadRepos 方法里的 LOAD_REPOS 后，触发 saga 中的 getRepos 请求数据。
      // 请求完成后调用 reposLoaded 与 repoLoadingError 两个 action 填充数据
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
