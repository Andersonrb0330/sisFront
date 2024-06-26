import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmationComponent } from '../../confirmation/confirmation.component'; // Asegúrate de que la ruta sea correcta
import { CategoriaService } from '../../service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaModel } from '../../../models/categoria.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmationComponent],
  templateUrl: './registrar-categoria.component.html',
  styleUrl: './registrar-categoria.component.css',
})
export class RegistrarCategoriaComponent implements OnInit {
  categoriaFormulario!: FormGroup;
  categoriaId!: number;

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
    this.categoriaId = this.activatedRoute.snapshot.params['id'];
    if (this.categoriaId) {
      this.obtenerCategoria();
    }
  }

  crearFormulario(): void {
    this.categoriaFormulario = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }

  obtenerCategoria() {
    this.categoriaService
      .getById(this.categoriaId)
      .subscribe((resultado: CategoriaModel) => {
        this.cargarInformacionActualizar(resultado);
      });
  }

  registrarCategoria() {
    if (this.categoriaFormulario.valid) {
      const categoria: CategoriaModel = {
        id: this.categoriaId || 0,
        nombre: this.categoriaFormulario.get('nombre')?.value,
      };
      if (this.categoriaId) {
        this.modalUpdate(categoria);
      } else {
        this.modalCreate(categoria);
      }
    } else {
      Object.values(this.categoriaFormulario.controls).forEach((control) => {
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  modalUpdate(categoria: CategoriaModel) {
    if (this.confirmModal) {
      this.confirmModal.openModal(
        'Actualizar Categoria',
        '¿Está seguro de actualizar Categoria?',
        () => {
          this.categoriaService
            .update(this.categoriaId, categoria)
            .subscribe(() => {
              console.log('Categoria actualizado correctamente:');
              this.router.navigate(['dashboard/categoria']);
            });
        }
      );
    }
  }

  modalCreate(categoria: any) {
    this.confirmModal.openModal(
      'Crear Categoria',
      '¿Está seguro de crear una Categoria?',
      () => {
        this.categoriaService
          .create(categoria)
          .subscribe((resultado: CategoriaModel) => {
            console.log('Categoria guardada correctamente', resultado);
            this.router.navigate(['dashboard/categoria']);
          });
      }
    );
  }
  cargarInformacionActualizar(categoria: CategoriaModel): void {
    this.categoriaFormulario.patchValue({ nombre: categoria.nombre });
  }

  navigateToCategoria() {
    this.router.navigate(['/dashboard/categoria']);
  }
}
