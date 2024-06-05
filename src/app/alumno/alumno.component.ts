import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlumnoModel } from '../../models/alumno.model';
import { AulaModel } from '../../models/aula.model';
import { CategoriaModel } from '../../models/categoria.model';
import { Router } from '@angular/router';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { AlumnoService } from '../service/alumno.service';
import { AulaService } from '../service/aula.service';
import { CategoriaService } from '../service/categoria.service';
import { ResponseAlumnoModel } from '../../models/responseAlumno.model';
import { FiltroAlumnoModel } from '../../models/filtroAlumno.model';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-alumno',
  standalone: true,
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    ConfirmationComponent,
  ],
})
export class AlumnoComponent implements OnInit {
  AlumnoFormulario!: FormGroup;
  alumnoModel: AlumnoModel[] = [];
  aulaModel: AulaModel[] = [];
  categoriaModel: CategoriaModel[] = [];

  totalItems: number = 0;
  limiteActual: number = 5;
  paginaActual: number = 0;

  @ViewChild('confirmModal', { static: false })
  confirmModal!: ConfirmationComponent;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private alumnoService: AlumnoService,
    private aulaService: AulaService,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerAula();
    this.obtenerCategorias();
  }

  crearFormulario(): void {
    this.AlumnoFormulario = this.formBuilder.group({
      nombres: [''],
      apellidos: [''],
      idAula: [''],
      idCategoria: [''],
    });
  }

  /////////////////////////////////////    OBTENER A AULA EN MI COMBO BOX      //////////////////////////////////

  obtenerAula(): void {
    this.aulaService.getAll().subscribe((tipos) => {
      this.aulaModel = tipos;
    });
  }

  /////////////////////////////////////    OBTENER A LA CATEGORIA EN MI COMBO BOX      //////////////////////////////////

  obtenerCategorias(): void {
    this.categoriaService.getAll().subscribe((categorias) => {
      this.categoriaModel = categorias;
    });
  }

  /////////////////////////////////////    FILTRO PARA MOSTRAR EN MI TABLA  ////////////////////////////////////////
  buscarAlumnos(event?: PageEvent): void {
    const filtro: FiltroAlumnoModel = this.AlumnoFormulario.value;
    let aula = parseInt(filtro.idAula?.toString() ?? '0');
    let categoria = parseInt(filtro.idCategoria?.toString() ?? '0');
    filtro.idAula = aula ? aula : null;
    filtro.idCategoria = categoria ? categoria : null;

    filtro.limite = event?.pageSize || this.limiteActual;
    filtro.pagina = event?.pageIndex || this.paginaActual;
    this.alumnoService
      .getAlumnoPaginado(filtro)
      .subscribe((response: ResponseAlumnoModel) => {
        this.alumnoModel = response.items;
        this.totalItems = response.totalItems;
        this.limiteActual = filtro.limite;
      });
  }

  /////////////////// BOTÓN LIMPIAR /////////////////////////////////////////////////////

  limpiarFiltros(): void {
    this.alumnoModel = [];
  }

  /////////////////////   PROCESO PARA ELIMINAR UN ALUMNO CON LA CONFIRMACIÓN DEL MODAL   /////////////////////////////////////
  deleteAlumno(id: number): void {
    this.confirmModal.openModal(
      'Eliminar Alumno',
      '¿Está seguro de eliminar al Alumno?',
      () => {
        this.alumnoService.delete(id).subscribe(() => {
          console.log('Se elimino correctamente', id);
          this.buscarAlumnos();
        });
      }
    );
  }

  ////////////////////////////////////    NAVIGATE     //////////////////////////////////////////////////////
  navigateToRegistrarAlumno() {
    this.router.navigate(['/registrar-alumno']);
  }

  navigateToActualizarAlumno(id: number): void {
    this.router.navigate(['/registrar-alumno', id]);
  }
}
