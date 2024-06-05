import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatriculaModel } from '../../models/matricula.model';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FiltroMatriculaModel } from '../../models/filtroMatricula.model';
import { ResponseMatriculaModel } from '../../models/responseMatricula.model';
import { MatriculaService } from '../service/matricula.service';
import { CommonModule } from '@angular/common';
import { LoginModel } from '../../models/login.model';
import { AlumnoModel } from '../../models/alumno.model';
import { AlumnoService } from '../service/alumno.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConfirmationComponent,
    MatPaginatorModule,
  ],
  templateUrl: './matricula.component.html',
  styleUrl: './matricula.component.css',
})
export class MatriculaComponent implements OnInit {
  MatriculaFormulario!: FormGroup;
  matriculaModel: MatriculaModel[] = [];
  loginModel: LoginModel[] = [];
  alumnoModel: AlumnoModel[] = [];

  totalItems: number = 0;
  limiteActual: number = 5;
  paginaActual: number = 0;

  @ViewChild('confirmModal', { static: false })
  confirmModal!: ConfirmationComponent;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private matriculaService: MatriculaService,
    private alumnoService: AlumnoService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerAlumno();
    this.obtenerLogin();
    const fechaControl = this.MatriculaFormulario.get('fecha');
    if (fechaControl && !fechaControl.value) {
      fechaControl.setValue(null);
    }
  }

  crearFormulario(): void {
    this.MatriculaFormulario = this.formBuilder.group({
      estado: [''],
      fecha: [''],
      idAlumno: [''],
      idLogin: [''],
    });
  }

  obtenerAlumno(): void {
    this.alumnoService.getAll().subscribe((tipos) => {
      this.alumnoModel = tipos;
    });
  }

  obtenerLogin(): void {
    this.loginService.getAll().subscribe((tipos) => {
      this.loginModel = tipos;
    });
  }

  buscarMatriculas(event?: PageEvent): void {
    const filtro: FiltroMatriculaModel = this.MatriculaFormulario.value;
    let alumno = parseInt(filtro.idAlumno?.toString() ?? '0');
    let login = parseInt(filtro.idLogin?.toString() ?? '0');
    filtro.idAlumno = alumno ? alumno : null;
    filtro.idLogin = login ? login : null;

    filtro.limite = event?.pageSize || this.limiteActual;
    filtro.pagina = event?.pageIndex || this.paginaActual;
    this.matriculaService
      .getMatriculaPaginado(filtro)
      .subscribe((response: ResponseMatriculaModel) => {
        this.matriculaModel = response.items;
        this.totalItems = response.totalItems;
        this.limiteActual = filtro.limite;
      });
  }

  limpiarFiltros(): void {
    this.MatriculaFormulario.reset();
    this.matriculaModel = [];
  }

  deleteMatricula(id: number): void {
    this.confirmModal.openModal(
      'Eliminar Matrícula',
      '¿Está seguro de eliminar la Matrícula?',
      () => {
        this.matriculaService.delete(id).subscribe(() => {
          console.log('Se eliminó correctamente', id);
          this.buscarMatriculas();
        });
      }
    );
  }

  navigateToRegistrarMatricula() {
    this.router.navigate(['/registrar-matricula']);
  }

  navigateToActualizarMatricula(id: number): void {
    this.router.navigate(['/registrar-matricula', id]);
  }
}
