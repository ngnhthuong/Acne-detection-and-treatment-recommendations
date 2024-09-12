import { call, put } from 'redux-saga/effects';
import makeRequest from '../../common/httpRequestAPI';
import {GET_ACNE_TREATMENT_SUCCESS , GET_ACNE_TREATMENT_FAIL } from '../actions/types';
export default function*(action) {
  try {
    const res = yield call(makeRequest, action.payload.config);
    yield put({ type: GET_ACNE_TREATMENT_SUCCESS, payload: res.data});
  } catch (error) {
    yield put({ type: GET_ACNE_TREATMENT_FAIL, payload: error.message });
  }
}