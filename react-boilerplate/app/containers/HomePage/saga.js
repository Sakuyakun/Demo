/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest, fork } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import { CHANGE_USERNAME } from './constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

export function* getRepos() {
  // 使用 select 获取 store state 的 username
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  yield takeLatest([LOAD_REPOS], getRepos);
}
