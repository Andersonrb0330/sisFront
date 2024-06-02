import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CategoriaModel } from '../../models/categoria.model';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { CategoriaService } from '../service/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  standalone: true,
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
  imports: [CommonModule, ConfirmationComponent],
})
export class CategoriaComponent {
  categoriaModel!: CategoriaModel[];

  @ViewChild('confirmModal', { static: false })
  confirmModal!: ConfirmationComponent;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.llenarTablaAula();
  }

  llenarTablaAula() {
    this.categoriaService.getAll().subscribe((respuesta) => {
      console.log(this.categoriaModel);
      this.categoriaModel = respuesta;
    });
  }

  deleteAula(id: number): void {
    this.confirmModal.openModal(
      'Eliminar Categoria',
      '¿Está seguro de eliminar una Categoria?',
      () => {
        this.categoriaService.delete(id).subscribe(() => {
          console.log('Se eliminó correctamente', id);
          this.llenarTablaAula();
        });
      }
    );
  }

  navigateToRegistrarAula() {
    this.router.navigate(['/registrar-categoria']);
  }

  navigateToActualizarAula(id: number): void {
    this.router.navigate(['/registrar-categoria', id]);
  }
}
