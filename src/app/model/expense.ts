export interface Expense {
  expenseId: number;
  name: string;
  amount: number | null;
  expenseType?: string;
  dueDate?: any;
  paymentDate?: any;
  paymentAmount?: number | null;
  paymentSource?: string;
  payType?: string; 
  note?: string;
  balanceType?: string;
  expenseCategoryType?: string;
}

export const emptyExpense: Expense = {
  expenseId: 500,
  name: 'New Expense',
  expenseType: 'Fixed',
  amount: null,
  dueDate: '',
  paymentAmount: null,
  paymentDate: '',
  paymentSource: '',
  payType: 'Fully Paid',
  note: '',
};

