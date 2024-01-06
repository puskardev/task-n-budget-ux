export interface Income {
    incomeId: number;
    source: string;
    amount: number | null;
    incomeCategoryType?: string;
    depositDate?: any;
    depositTo?: string;
    note?: string;   
}