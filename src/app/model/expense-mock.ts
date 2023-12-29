import { PayType } from '../enum/expense-enum';
import { Expense } from './expense';

export const MOCK_EXPENSE_DATA: Expense[] = [
  {
    expenseId: 1,
    name: 'Rent',
    amount: 2500,
    dueDate: '2023-05-24',
    paymentDate: '2023-05-21',
    paymentAmount: 2000,
    paymentSource: 'Bofa - Debit',
    note: 'Rent paid in full',
    payType: PayType.FullPay
  },
  {
    expenseId: 2,
    name: 'Utilies',
    amount: 500,
    dueDate: '2023-07-05',
    paymentDate: '2023-07-01',
    paymentAmount: 300,
    paymentSource: 'Barclays - Debit',
    note: 'Utilies paid in partial',
    payType: PayType.PartialPay
  },
  {
    expenseId: 3,
    name: 'Food',
    amount: 2500,
    dueDate: '2023-08-26',
    paymentDate: '2023-08-21',
    paymentAmount: 2500,
    paymentSource: 'Bofa - Credit',
    note: 'Food paid in full',
    payType: PayType.ScheduledPay
  },
  {
    expenseId: 4,
    name: 'Shopping',
    amount: 2500,
    dueDate: '2023-09-22',
    paymentDate: '2023-05-21',
    paymentAmount: 2000,
    paymentSource: 'Bofa - Debit',
    note: 'Shopping paid in full',
    payType: PayType.PartialPay
  },
  {
    expenseId: 4,
    name: 'Subscriptions',
    amount: 2900,
    dueDate: '2023-09-28',
    paymentDate: '2023-09-30',
    paymentAmount: 2900,
    paymentSource: 'Bofa - Debit',
    note: 'Shopping paid in full',
    payType: PayType.FullPay
  },
];
