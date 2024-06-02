import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { AulaService } from '../../service/aula.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AulaModel } from '../../../models/aula.model';

@Component({
  selector: 'app-registrar-aula',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmationComponent],
  templateUrl: './registrar-aula.component.html',
  styleUrl: './registrar-aula.component.css',
})
export class RegistrarAulaComponent implements OnInit {
  aulaFormulario!: FormGroup;
  aulaId!: number;

  @ViewChild('confirmModal', { static: false })
  confirmModal!: ConfirmationComponent;

  constructor(
    private formBuilder: FormBuilder,
    private aulaService: AulaService,
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
    this.aulaFormulario = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }

  //////////////// OBTENER A UN ALUMNO PARA ACTUALIZAR ////////////////////////////////////////
  obtenerAula() {
    this.aulaService.getById(this.aulaId).subscribe((resultado: AulaModel) => {
      this.cargarInformacionActualizar(resultado);
    });
  }

  //////////////// REGISTRAR A UN ALUMNO //////////////////////////////////////
  registrarAula() {
    if (this.aulaFormulario.valid) {
      const aula: AulaModel = {
        id: this.aulaId || 0,
        nombre: this.aulaFormulario.get('nombre')?.value,
      };
      if (this.aulaId) {
        this.modalUpdate(aula);
      } else {
        this.modalCreate(aula);
      }
    } else {
      // Verificar si los controles existen antes de acceder a las propiedades
      Object.values(this.aulaFormulario.controls).forEach((control) => {
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  modalUpdate(aula: AulaModel) {
    this.confirmModal.openModal(
      'Actualizar Aula',
      '¿Está seguro de actualizar Aula?',
      () => {
        this.aulaService.update(this.aulaId, aula).subscribe(() => {
          console.log('Aula actualizado correctamente:');
          this.router.navigate(['/aula']);
        });
      }
    );
  }

  modalCreate(aula: AulaModel) {
    this.confirmModal.openModal(
      'Crear Aula',
      '¿Está seguro de crear una Aula?',
      () => {
        this.aulaService.create(aula).subscribe((resultado: AulaModel) => {
          console.log('Aula guardado correctamente:', resultado);
          this.router.navigate(['/aula']);
        });
      }
    );
  }

  cargarInformacionActualizar(aula: AulaModel): void {
    this.aulaFormulario.patchValue({ ['nombre']: aula.nombre });
  }

  navigateToAula() {
    this.router.navigate(['/dashboard/aula']);
  }
}
