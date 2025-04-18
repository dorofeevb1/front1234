import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router) {}

  navigateTo(route: string) {
    console.log(route);
    
    this.router.navigate([route]);
  }

  shouldDisplayHeader(): boolean {
    return this.router.url !== '/login';
  }

}
