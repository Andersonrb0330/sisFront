// aula.component.ts
import { AulaService } from './../service/aula.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AulaModel } from '../../models/aula.model';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-aula',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ConfirmationComponent],
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css'],
})
export class AulaComponent implements OnInit {
  aulaModel: AulaModel[] = [];

  @ViewChild('confirmModal', { static: false })
  confirmModal!: ConfirmationComponent;

  constructor(private aulaService: AulaService, private router: Router) {}

  ngOnInit(): void {
    this.llenarTablaAula();
  }

  llenarTablaAula() {
    this.aulaService.getAll().subscribe((respuesta) => {
      console.log(this.aulaModel);
      this.aulaModel = respuesta;
    });
  }

  deleteAula(id: number): void {
    this.confirmModal.openModal(
      'Eliminar Aula',
      '¿Está seguro de eliminar una Aula?',
      () => {
        this.aulaService.delete(id).subscribe(() => {
          console.log('Se eliminó correctamente', id);
          this.llenarTablaAula();
        });
      }
    );
  }

  navigateToRegistrarAula() {
    this.router.navigate(['/registrar-aula']);
  }

  navigateToActualizarAula(id: number): void {
    this.router.navigate(['/registrar-aula', id]);
  }
}
