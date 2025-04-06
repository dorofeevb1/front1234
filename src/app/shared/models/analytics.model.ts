export interface Analytics {
    summary: {
        total_income: number;
        total_expenses: number;
        balance: number;
    };
    category_breakdown: { name: string; total_amount: number }[];
    forecast: {
        next_month_balance: number;
        financial_cushion: number;
    };
    recommendations: string[];
}