import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AulaComponent } from './aula/aula.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { RegistrarAulaComponent } from './aula/registrar-aula/registrar-aula.component';
import { RegistrarCategoriaComponent } from './categoria/registrar-categoria/registrar-categoria.component';
import { RegistrarAlumnoComponent } from './alumno/registrar-alumno/registrar-alumno.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirecciona al login por defecto

  //////////////////
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'alumno', pathMatch: 'full' }, // Redirecciona a la ruta de alumnos por defecto
      { path: 'alumno', component: AlumnoComponent },
      { path: 'aula', component: AulaComponent },
      { path: 'categoria', component: CategoriaComponent },
    ],
  },
  { path: 'registrar-alumno', component: RegistrarAlumnoComponent },
  { path: 'registrar-alumno/:id', component: RegistrarAlumnoComponent },

  //////////////////
  { path: 'registrar-aula', component: RegistrarAulaComponent },
  { path: 'registrar-aula/:id', component: RegistrarAulaComponent },

  //////////////////
  { path: 'registrar-categoria', component: RegistrarCategoriaComponent },
  { path: 'registrar-categoria/:id', component: RegistrarCategoriaComponent },
];
