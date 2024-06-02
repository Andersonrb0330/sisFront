import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  constructor(private router: Router) {}

  alumno() {
    this.router.navigateByUrl('/dashboard/alumno');
  }

  categoria() {
    this.router.navigateByUrl('/dashboard/aula');
  }
  aula() {
    this.router.navigateByUrl('/dashboard/categoria');
  }
}
