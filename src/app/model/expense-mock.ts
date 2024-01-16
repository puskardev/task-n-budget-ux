import { ExpenseCategoryType } from '@Enums/category-type';
import { PayType } from '../enum/expense-enum';
import { Expense } from './expense';

export const MOCK_EXPENSE_DATA: Expense[] = [
  {
    expenseId: 1,
    name: 'Rent',
    expenseType: 'Fixed',
    amount: 2500,
    dueDate: '2023-05-24',
    paymentDate: '2023-05-21',
    paymentAmount: 2000,
    paymentSource: 'Bofa - Debit',
    note: 'Rent paid in full',
    payType: PayType.FullPay,
    expenseCategoryType: ExpenseCategoryType.Misc,
  },
  {
    expenseId: 2,
    name: 'Utilies',
    expenseType: 'Variable',
    amount: 500,
    dueDate: '2023-07-05',
    paymentDate: '2023-07-01',
    paymentAmount: 300,
    paymentSource: 'Barclays - Debit',
    note: 'Utilies paid in partial',
    payType: PayType.PartialPay,
    expenseCategoryType: ExpenseCategoryType.Misc,
  },
  {
    expenseId: 3,
    expenseType: 'Fixed',
    name: 'Food',
    amount: 2500,
    dueDate: '2023-08-26',
    paymentDate: '2023-08-21',
    paymentAmount: 2500,
    paymentSource: 'Bofa - Credit',
    note: 'Food paid in full',
    payType: PayType.ScheduledPay,
    expenseCategoryType: ExpenseCategoryType.CreditCards,
  },
  {
    expenseId: 4,
    expenseType: 'Fixed',
    name: 'Shopping',
    amount: 2500,
    dueDate: '2023-09-22',
    paymentDate: '2023-05-21',
    paymentAmount: 2000,
    paymentSource: 'Bofa - Debit',
    note: 'Shopping paid in full',
    payType: PayType.PartialPay,
    expenseCategoryType: ExpenseCategoryType.Misc,
  },
  {
    expenseId: 4,
    expenseType: 'Fixed',
    name: 'Subscriptions',
    amount: 2900,
    dueDate: '2023-09-28',
    paymentDate: '2023-09-30',
    paymentAmount: 2900,
    paymentSource: 'Bofa - Debit',
    note: 'Shopping paid in full',
    payType: PayType.FullPay,
    expenseCategoryType: ExpenseCategoryType.Subscriptions,
  },
  {
    expenseId: 5,
    expenseType: 'Variable',
    name: 'Groceries',
    amount: 1500,
    dueDate: '2023-10-05',
    paymentDate: '2023-10-07',
    paymentAmount: 1500,
    paymentSource: 'Bofa - Credit',
    note: 'Groceries paid in full',
    payType: PayType.FullPay,
    expenseCategoryType: ExpenseCategoryType.Subscriptions,
  },
  {
    expenseId: 6,
    expenseType: 'Fixed',
    name: 'Barclays - Credit Card',
    amount: 10000,
    dueDate: '2023-10-01',
    paymentDate: '2023-10-01',
    paymentAmount: 10000,
    paymentSource: 'Bofa - Debit',
    note: 'Rent paid in full',
    payType: PayType.FullPay,
    expenseCategoryType: ExpenseCategoryType.CreditCards,
  },
];
