import { environment } from '../../environments/environment';

const BASE_URL = environment.apiUrl;

export const API_ENDPOINTS = {
  // income
  income: BASE_URL + '/income',
  incomeAll: BASE_URL + '/income/all',
  incomeById: (incomeId: number) => BASE_URL + '/income/' + incomeId,

  // expense
  expense: BASE_URL + '/expense',
  expenseAll: BASE_URL + '/expense/all',
  expenseById: (expenseId: number) => BASE_URL + '/expense/' + expenseId,

  // register
  register: BASE_URL + '/register',

  // authenticate
  authenticate: BASE_URL + '/authenticate',

  // budget
  budget: BASE_URL + '/budget',
  budgetByDate: (date: string) => BASE_URL + '/budget/' + date,
};
