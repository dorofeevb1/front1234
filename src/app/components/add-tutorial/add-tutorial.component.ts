import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Income } from '../../shared/models/income.model';

@Component({
    selector: 'app-add-tutorial',
    standalone: true,
    imports: [CommonModule, FormsModule], // Импорты для работы с формами и *ngIf
    templateUrl: './add-tutorial.component.html',
    styleUrls: ['./add-tutorial.component.scss']
})
export class AddIncomeComponent implements OnInit {
    income: Income = {
        amount: 0,
        description: '',
        date: ''
    };
    incomes: Income[] = []; // Для хранения списка доходов
    submitted = false;

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        this.loadIncomes(); // Загружаем список доходов при инициализации
    }

    saveIncome(): void {
        this.apiService.post<Income>('api/incomes/', this.income).subscribe({
            next: (res) => {
                console.log('Income added:', res);
                this.submitted = true;
                this.loadIncomes(); // Обновляем список после добавления
                this.resetForm();
            },
            error: (err) => console.error('Error adding income:', err)
        });
    }

    loadIncomes(): void {
        console.log('Начало загрузки доходов');
        this.apiService.get<any>('api/incomes/').subscribe({
            next: (res) => {
                console.log('Получены данные с сервера (тип):', typeof res);
                console.log('Получены данные с сервера:', res);
                
                // Проверяем, является ли ответ массивом
                if (Array.isArray(res)) {
                    console.log('Обнаружен формат массива');
                    this.incomes = res.map(item => {
                        console.log('Элемент массива:', item);
                        // Правильно извлекаем данные из структуры Django
                        return {
                            id: item.pk,
                            amount: item.fields.amount,
                            description: item.fields.description,
                            date: item.fields.date,
                            created_at: item.fields.created_at
                        };
                    });
                }
                // Остальные проверки оставляем как есть...
                else if (res && typeof res === 'object' && 'results' in res && Array.isArray(res.results)) {
                    console.log('Обнаружен формат с полем results');
                    this.incomes = res.results.map((item: { id: number; amount: number; description: string; date: string; created_at: string }) => ({
                        id: item.id,
                        amount: item.amount,
                        description: item.description,
                        date: item.date,
                        created_at: item.created_at
                    }));
                } 
                // Проверяем, является ли ответ объектом с данными
                else if (res && typeof res === 'object') {
                    console.log('Обнаружен формат объекта');
                    // Попробуем найти массив в ответе
                    const dataArray = Object.values(res).find(val => Array.isArray(val));
                    if (dataArray) {
                        console.log('Найден массив в объекте:', dataArray);
                        this.incomes = dataArray.map(item => ({
                            id: item.id,
                            amount: item.amount,
                            description: item.description,
                            date: item.date,
                            created_at: item.created_at
                        }));
                    } else {
                        console.error('Не удалось найти массив данных в ответе');
                        this.incomes = [];
                    }
                } else {
                    console.error('Неожиданный формат данных:', res);
                    this.incomes = [];
                }
                
                console.log('Обработанный список доходов:', this.incomes);
            },
            error: (err) => console.error('Ошибка загрузки доходов:', err)
        });
    }

    resetForm(): void {
        this.income = { amount: 0, description: '', date: '' };
        this.submitted = false;
    }
}
