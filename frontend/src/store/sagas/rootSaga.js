import { GET_ACNE_TREATMENT } from '../actions/types';
import getAcneTreatmentSaga from './getAcneTreatmentSaga';
import { takeEvery,all } from 'redux-saga/effects';
const rootsaga = function*() {
  yield all([takeEvery(GET_ACNE_TREATMENT, getAcneTreatmentSaga)]);
};

export default rootsaga;