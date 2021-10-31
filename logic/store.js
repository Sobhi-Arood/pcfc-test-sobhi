import { createStore, applyMiddleware } from 'redux';
import {
  ADD_EMPLOYEE_TO_LIST,
  EDIT_EMPLOYEE,
  GET_EMPLOYEES_LIST_FAIL,
  GET_EMPLOYEES_LIST_REQUESTED,
  GET_EMPLOYEES_LIST_SUCCESS,
} from './constants';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const initialState = {
  employees: [],
  image: '',
  loading: false,
  error: false,
};

const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_LIST_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case GET_EMPLOYEES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.employees,
        image: action.image,
      };
    case GET_EMPLOYEES_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case EDIT_EMPLOYEE:
      const eIndex = state.employees.findIndex(
        (element) => element.id == action.payload.id
      );
      let newArray = [...state.employees];
      newArray[eIndex] = action.payload;
      return { employees: newArray };
    case ADD_EMPLOYEE_TO_LIST:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    default:
      return state;
  }
};

export const store = createStore(
  employeesReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
