import { Routes } from '@angular/router';
import { AddIncomeComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddExpenseComponent } from './components/tutorials-list/tutorials-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [

    { path: 'incomes', component: AddIncomeComponent },
    { path: 'tutorial-details', component: TutorialDetailsComponent },
    { path: 'expenses', component: AddExpenseComponent },
    // { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '', redirectTo: '/incomes', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/incomes' }

];
