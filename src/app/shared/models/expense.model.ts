export interface Expense {
    id?: number;
    amount: number;
    description: string;
    date: string;
    created_at?: string;
    category?: {
      id: number;
      name: string;
    };
    isCategoryEdited?: boolean; // Добавьте это свойство
  }
  