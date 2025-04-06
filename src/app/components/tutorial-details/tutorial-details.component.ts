import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { Analytics } from '../../shared/models/analytics.model';
import { FormsModule } from '@angular/forms';  // Для ngModel

@Component({
    selector: 'app-tutorial-details',
    standalone: true,
    imports: [CommonModule, FormsModule],  // Добавляем FormsModule
    templateUrl: './tutorial-details.component.html',
    styleUrls: ['./tutorial-details.component.scss']
})
export class TutorialDetailsComponent implements OnInit {
    analytics: Analytics | null = null;
    selectedPeriod: string = 'all';  // Значение по умолчанию

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        this.loadAnalytics();
    }

    loadAnalytics(): void {
        this.apiService.get<Analytics>(`api/analytics/?period=${this.selectedPeriod}`).subscribe({
            next: (res) => {
                this.analytics = res;
            },
            error: (err) => console.error('Error loading analytics:', err)
        });
    }

    onPeriodChange(): void {
        this.loadAnalytics();  // Перезагружаем аналитику при смене периода
    }
}