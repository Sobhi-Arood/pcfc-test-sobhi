import { put, all, takeEvery, call } from 'redux-saga/effects';
import {
  GET_EMPLOYEES_LIST_FAIL,
  GET_EMPLOYEES_LIST_REQUESTED,
  GET_EMPLOYEES_LIST_SUCCESS,
} from './constants';
import Employees from './model/employees';

function* getEmployeesList() {
  const img = yield call(() => fetch('https://httpbin.org/image/jpeg'));
  const list = Employees;
  if (list.length > 0) {
    yield put({
      type: GET_EMPLOYEES_LIST_SUCCESS,
      employees: list,
      image: img['url'],
    });
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
