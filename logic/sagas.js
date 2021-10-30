import { put, all, takeEvery } from 'redux-saga/effects';
import {
  GET_EMPLOYEES_LIST_FAIL,
  GET_EMPLOYEES_LIST_REQUESTED,
  GET_EMPLOYEES_LIST_SUCCESS,
} from './constants';
import Employees from './model/employees';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* getEmployeesList() {
  yield delay(3000);
  const list = Employees;
  if (list.length > 0) {
    yield put({ type: GET_EMPLOYEES_LIST_SUCCESS, employees: list });
  } else {
    yield put({ type: GET_EMPLOYEES_LIST_FAIL, error: true });
  }
}

function* employeesSaga() {
  yield takeEvery(GET_EMPLOYEES_LIST_REQUESTED, getEmployeesList);
}

export default function* rootSaga() {
  yield all([employeesSaga()]);
}
