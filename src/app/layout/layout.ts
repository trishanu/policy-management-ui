import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class LayoutComponent {

  constructor(private router: Router) {}

  logout() {

    localStorage.removeItem('token');

    this.router.navigate(['/login'], {
      replaceUrl: true
    });

  }

}