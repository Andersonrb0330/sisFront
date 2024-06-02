import { AulaService } from './../../service/aula.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaModel } from '../../../models/categoria.model';
import { AulaModel } from '../../../models/aula.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CategoriaService } from '../../service/categoria.service';
import { AlumnoModel } from '../../../models/alumno.model';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { AlumnoService } from '../../service/alumno.service';

@Component({
  selector: 'app-registrar-alumno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmationComponent],
  templateUrl: './registrar-alumno.component.html',
  styleUrl: './registrar-alumno.component.css',
})
export class RegistrarAlumnoComponent implements OnInit {
  alumnoFormulario!: FormGroup;
  aulaModel: AulaModel[] = [];
  categoriaModel: CategoriaModel[] = [];
  alumnoId!: number;

  @ViewChild('confirmModal', { static: false })
  confirmModal!: ConfirmationComponent;

  constructor(
    private formBuilder: FormBuilder,
    private aulaService: AulaService,
    private alumnoService: AlumnoService,
    private categoriaService: CategoriaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.alumnoId = this.activatedRoute.snapshot.params['id'];
    if (this.alumnoId) {
      this.obtenerAlumno();
    }
    this.GetAula();
    this.GetCategoria();
  }

  ////////////////// OBTENER A AULA EN MI COMBO BOX /////////////////////////////
  GetAula(): void {
    this.aulaService.getAll().subscribe((aulas) => {
      this.aulaModel = aulas;
    });
  }

  ////////////////// OBTENER CATEGGORIA EN MI COMBO BOX /////////////////////////
  GetCategoria(): void {
    this.categoriaService.getAll().subscribe((categorias) => {
      this.categoriaModel = categorias;
    });
  }

  /////////////////
  crearFormulario(): void {
    this.alumnoFormulario = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      edad: ['', [Validators.required, Validators.max(99), Validators.min(0)]],
      idAula: ['', Validators.required],
      idCategoria: ['', Validators.required],
    });
  }
  //////////////// OBTENER A UN ALUMNO ////////////////////////////////////////
  obtenerAlumno() {
    this.alumnoService
      .getById(this.alumnoId)
      .subscribe((resultado: AlumnoModel) => {
        this.cargarInformacionActualizar(resultado);
      });
  }

  //////////////// REGISTRAR A UN ALUMNO //////////////////////////////////////
  registrarAlumno() {
    if (this.alumnoFormulario.valid) {
      const alumno: AlumnoModel = {
        id: this.alumnoId || 0,
        nombres: this.alumnoFormulario.get('nombres')?.value,
        apellidos: this.alumnoFormulario.get('apellidos')?.value,
        telefono: this.alumnoFormulario.get('telefono')?.value,
        edad: this.alumnoFormulario.get('edad')?.value,
        idAula: this.alumnoFormulario.get('idAula')?.value,
        idCategoria: this.alumnoFormulario.get('idCategoria')?.value,
      };
      if (this.alumnoId) {
        this.modalUpdate(alumno);
      } else {
        this.modalCreate(alumno);
      }
    } else {
      // Verificar si los controles existen antes de acceder a las propiedades
      Object.values(this.alumnoFormulario.controls).forEach((control) => {
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  modalUpdate(alumno: AlumnoModel) {
    this.confirmModal.openModal(
      'Actualizar Alumno',
      '¿Está seguro de actualizar el Alumno?',
      () => {
        this.alumnoService.update(this.alumnoId, alumno).subscribe(() => {
          console.log('Alumno actualizado correctamente:');
          this.router.navigate(['/alumno']);
        });
      }
    );
  }

  modalCreate(alumno: AlumnoModel) {
    this.confirmModal.openModal(
      'Crear Alumno',
      '¿Está seguro de crear un nuevo Alumno?',
      () => {
        this.alumnoService
          .create(alumno)
          .subscribe((resultado: AlumnoModel) => {
            console.log('Alumno guardado correctamente:', resultado);
            this.router.navigate(['/alumno']);
          });
      }
    );
  }

  cargarInformacionActualizar(alumno: AlumnoModel): void {
    this.alumnoFormulario.patchValue({ ['nombres']: alumno.nombres });
    this.alumnoFormulario.patchValue({ ['apellidos']: alumno.apellidos });
    this.alumnoFormulario.patchValue({ ['telefono']: alumno.telefono });
    this.alumnoFormulario.patchValue({ ['edad']: alumno.edad });
    this.alumnoFormulario.patchValue({ ['idAula']: alumno.aula?.id });
    this.alumnoFormulario.patchValue({ ['idCategoria']: alumno.categoria?.id });
  }

  navigateToAlumno() {
    this.router.navigate(['/dashboard/alumno']);
  }
}
