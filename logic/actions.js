import {
  ADD_EMPLOYEE_TO_LIST,
  EDIT_EMPLOYEE,
  GET_EMPLOYEES_LIST_REQUESTED,
} from './constants';

export const getEmployeesList = () => {
  return { type: GET_EMPLOYEES_LIST_REQUESTED };
};

export const addToEmployeesList = (data) => {
  return { type: ADD_EMPLOYEE_TO_LIST, payload: data };
};

export const editToEmployeesList = (data) => {
  return { type: EDIT_EMPLOYEE, payload: data };
};
