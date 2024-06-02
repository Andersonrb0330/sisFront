import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { CategoriaService } from '../../service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaModel } from '../../../models/categoria.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-categoria.component.html',
  styleUrl: './registrar-categoria.component.css',
})
export class RegistrarCategoriaComponent implements OnInit {
  categoriaFormulario!: FormGroup;
  aulaId!: number;

  @ViewChild('confirmModal', { static: false })
  confirmModal!: ConfirmationComponent;

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.aulaId = this.activatedRoute.snapshot.params['id'];
    if (this.aulaId) {
      this.obtenerAula();
    }
  }

  crearFormulario(): void {
    this.categoriaFormulario = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }

  //////////////// OBTENER A UN ALUMNO PARA ACTUALIZAR ////////////////////////////////////////
  obtenerAula() {
    this.categoriaService
      .getById(this.aulaId)
      .subscribe((resultado: CategoriaModel) => {
        this.cargarInformacionActualizar(resultado);
      });
  }

  //////////////// REGISTRAR A UN ALUMNO //////////////////////////////////////
  registrarCategoria() {
    if (this.categoriaFormulario.valid) {
      const categoria: CategoriaModel = {
        id: this.aulaId || 0,
        nombre: this.categoriaFormulario.get('nombre')?.value,
      };
      if (this.aulaId) {
        this.modalUpdate(categoria);
      } else {
        this.modalCreate(categoria);
      }
    } else {
      // Verificar si los controles existen antes de acceder a las propiedades
      Object.values(this.categoriaFormulario.controls).forEach((control) => {
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  modalUpdate(categoria: CategoriaModel) {
    this.confirmModal.openModal(
      'Actualizar Categoria',
      '¿Está seguro de actualizar Categoria?',
      () => {
        this.categoriaService.update(this.aulaId, categoria).subscribe(() => {
          console.log('Categoria actualizado correctamente:');
          this.router.navigate(['/aula']);
        });
      }
    );
  }

  modalCreate(categoria: CategoriaModel) {
    this.confirmModal.openModal(
      'Crear Categoria',
      '¿Está seguro de crear una Categoria?',
      () => {
        this.categoriaService
          .create(categoria)
          .subscribe((resultado: CategoriaModel) => {
            console.log('Categoria guardado correctamente:', resultado);
            this.router.navigate(['/categoria']);
          });
      }
    );
  }

  cargarInformacionActualizar(categoria: CategoriaModel): void {
    this.categoriaFormulario.patchValue({ ['nombre']: categoria.nombre });
  }

  navigateToCategoria() {
    this.router.navigate(['/dashboard/categoria']);
  }
}
