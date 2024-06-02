import { Component } from '@angular/core';
import { AulaComponent } from '../aula/aula.component';
import { CategoriaComponent } from '../categoria/categoria.component';
import { AlumnoComponent } from '../alumno/alumno.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [
    AulaComponent,
    CategoriaComponent,
    AlumnoComponent,
    RouterModule,
    MenuComponent,
  ],
})
export class DashboardComponent {}
