export interface Income {
    incomeId: number;
    source: string;
    amount: number | null;
    incomeCategoryType?: string;
    depositDate?: any;
    depositTo?: string;
    note?: string;   
}

export const emptyIncome: Income = {
    incomeId: 500,
    source: 'New Income',
    amount: null,
    incomeCategoryType: '',
    depositDate: '',
    depositTo: '',
    note: '',
};
  