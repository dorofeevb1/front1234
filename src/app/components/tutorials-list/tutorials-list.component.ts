import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Expense } from '../../shared/models/expense.model';

@Component({
  selector: 'app-tutorials-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.scss']
})
export class AddExpenseComponent implements OnInit {
  expense: Expense = {
    amount: 0,
    description: '',
    date: ''
  };
  expenses: Expense[] = [];
  submitted = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  saveExpense(): void {
    this.apiService.post<Expense>('api/expenses/', this.expense).subscribe({
      next: (res) => {
        console.log('Expense added:', res);
        this.submitted = true;
        this.loadExpenses();
        this.resetForm();
      },
      error: (err) => console.error('Error adding expense:', err)
    });
  }

  loadExpenses(): void {
    this.apiService.get<any[]>('api/expenses/').subscribe({
      next: (res) => {
        this.expenses = res.map(item => {
          const expense = {
            id: item.pk || item.id,
            amount: item.fields?.amount || item.amount,
            description: item.fields?.description || item.description,
            date: item.fields?.date || item.date,
            created_at: item.fields?.created_at || item.created_at,
            category: (item.fields?.category || item.category) ?
              {
                id: item.fields?.category?.id || item.category?.id || 0,
                name: item.fields?.category?.name || item.category?.name || ''
              } :
              { id: 0, name: '' },
            isCategoryEdited: false // Инициализируем флаг
          };
          return expense;
        });
      },
      error: (err) => console.error('Error loading expenses:', err)
    });
  }

  updateCategory(expense: Expense, newCategoryName: string | undefined): void {
    const categoryName = newCategoryName?.trim() || 'Не определено';
    const categoryId = expense.category?.id || 0;
    const updatedExpense = {
      ...expense,
      category: { id: categoryId, name: categoryName }
    };
    this.apiService.put<Expense>(`api/expenses/${expense.id}/`, updatedExpense).subscribe({
      next: (res) => {
        console.log('Category updated:', res);
        this.loadExpenses();
      },
      error: (err) => console.error('Error updating category:', err)
    });
  }

  resetForm(): void {
    this.expense = { amount: 0, description: '', date: '' };
    this.submitted = false;
  }

  updateCategoryName(expense: Expense, newName: string): void {
    if (!expense.category) {
      expense.category = { id: 0, name: newName };
    } else {
      expense.category.name = newName;
    }
    expense.isCategoryEdited = true; // Устанавливаем флаг при изменении категории
  }
}
